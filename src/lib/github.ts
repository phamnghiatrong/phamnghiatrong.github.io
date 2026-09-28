/**
 * Lấy repo GitHub lúc build (không gọi API khi người xem mở trang).
 *
 * - Chỉ lấy repo công khai, không phải fork, có topic trong `profile.json → githubTopic` (mặc định "portfolio").
 * - Kèm README đã được GitHub chuyển sang HTML; link và ảnh tương đối được đổi thành link tuyệt đối.
 * - Trên GitHub Actions dùng GITHUB_TOKEN để không bị giới hạn lượt gọi.
 * - Gọi API lỗi (mất mạng, hết lượt...) thì dùng src/data/github-cache.json và build vẫn chạy tiếp.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { profile } from './data';

export interface Repo {
  name: string;
  /** Đường dẫn trên site: /projects/<slug>/ (chữ thường) */
  slug: string;
  description: string;
  language: string | null;
  topics: string[];
  /** Lần push gần nhất (ISO) */
  updatedAt: string;
  htmlUrl: string;
  homepage: string | null;
  stars: number;
  defaultBranch: string;
  readmeHtml: string | null;
}

interface Cache {
  fetchedAt: string;
  username: string;
  topic: string;
  repos: Repo[];
}

// Tính từ thư mục dự án (lệnh build luôn chạy ở gốc dự án)
const CACHE_URL = join(process.cwd(), 'src', 'data', 'github-cache.json');
const API = 'https://api.github.com';
const TIMEOUT_MS = 15_000;

let pending: Promise<Repo[]> | undefined;

/** Repo portfolio, mới cập nhật nhất trước. */
export function getPortfolioRepos(): Promise<Repo[]> {
  pending ??= load();
  return pending;
}

async function load(): Promise<Repo[]> {
  const username = profile.githubUsername;
  const topic = profile.githubTopic;
  try {
    const repos = await fetchRepos(username, topic);
    await saveCache({ fetchedAt: new Date().toISOString(), username, topic, repos });
    console.log(`[github] Lấy ${repos.length} repo có topic "${topic}" của ${username}.`);
    return repos;
  } catch (error) {
    const cache = await readCache();
    const reason = error instanceof Error ? error.message : String(error);
    if (cache && cache.username === username) {
      console.warn(`[github] Không gọi được GitHub API (${reason}). Dùng dữ liệu cache lúc ${cache.fetchedAt}.`);
      return cache.repos;
    }
    console.warn(`[github] Không gọi được GitHub API (${reason}) và chưa có cache. Trang Project chỉ hiện project khai báo tay.`);
    return [];
  }
}

async function api(path: string, accept = 'application/vnd.github+json'): Promise<Response> {
  const headers: Record<string, string> = {
    Accept: accept,
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'personal-site-build',
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return fetch(`${API}${path}`, { headers, signal: AbortSignal.timeout(TIMEOUT_MS) });
}

async function fetchRepos(username: string, topic: string): Promise<Repo[]> {
  const res = await api(`/users/${encodeURIComponent(username)}/repos?per_page=100&type=owner&sort=pushed`);
  if (!res.ok) throw new Error(`HTTP ${res.status} khi lấy danh sách repo`);
  const list = (await res.json()) as any[];

  const picked = list.filter((r) => !r.fork && !r.private && (!topic || (r.topics ?? []).includes(topic)));

  return Promise.all(
    picked.map(async (r): Promise<Repo> => ({
      name: r.name,
      slug: String(r.name).toLowerCase(),
      description: r.description ?? '',
      language: r.language ?? null,
      topics: (r.topics ?? []).filter((t: string) => t !== topic),
      updatedAt: r.pushed_at ?? r.updated_at,
      htmlUrl: r.html_url,
      homepage: r.homepage || null,
      stars: r.stargazers_count ?? 0,
      defaultBranch: r.default_branch ?? 'main',
      readmeHtml: await fetchReadme(username, r.name, r.default_branch ?? 'main'),
    })),
  );
}

async function fetchReadme(owner: string, repo: string, branch: string): Promise<string | null> {
  const res = await api(`/repos/${owner}/${repo}/readme`, 'application/vnd.github.html+json');
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`HTTP ${res.status} khi lấy README của ${repo}`);
  return absolutizeReadme(await res.text(), owner, repo, branch);
}

/**
 * README trên GitHub dùng đường dẫn tương đối (./docs/a.png, images/topo.png, CONTRIBUTING.md).
 * Trên site của mình các đường dẫn đó sẽ hỏng, nên đổi thành link tuyệt đối về GitHub:
 * ảnh → raw.githubusercontent.com, link → github.com/.../blob/<nhánh>/...
 * Link neo "#muc" đổi sang "#user-content-muc" cho khớp id mà GitHub sinh ra.
 */
export function absolutizeReadme(html: string, owner: string, repo: string, branch: string): string {
  const raw = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/`;
  const blob = `https://github.com/${owner}/${repo}/blob/${branch}/`;
  const isAbsolute = (url: string) => /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(url);
  const clean = (url: string) => url.replace(/^\.\//, '').replace(/^\//, '');

  return html
    .replace(/(<img\b[^>]*?\ssrc=")([^"]+)(")/gi, (m, a, url, b) => (isAbsolute(url) ? m : a + raw + clean(url) + b))
    .replace(/(<a\b[^>]*?\shref=")([^"]+)(")/gi, (m, a, url, b) => {
      if (url.startsWith('#') && !url.startsWith('#user-content-')) return a + '#user-content-' + url.slice(1) + b;
      return isAbsolute(url) ? m : a + blob + clean(url) + b;
    });
}

async function readCache(): Promise<Cache | null> {
  try {
    return JSON.parse(await readFile(CACHE_URL, 'utf-8')) as Cache;
  } catch {
    return null;
  }
}

/** Chỉ ghi file khi dữ liệu thật sự đổi, để không tạo thay đổi thừa mỗi lần build. */
async function saveCache(next: Cache) {
  const prev = await readCache();
  const same =
    prev &&
    prev.username === next.username &&
    prev.topic === next.topic &&
    JSON.stringify(prev.repos) === JSON.stringify(next.repos);
  if (same) return;
  try {
    await writeFile(CACHE_URL, JSON.stringify(next, null, 2) + '\n', 'utf-8');
  } catch {
    // Không ghi được (vd. thư mục chỉ đọc) thì bỏ qua — cache chỉ là dự phòng
  }
}
