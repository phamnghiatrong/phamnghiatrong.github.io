/**
 * Ghép hai nguồn project:
 *  1. Repo GitHub có topic "portfolio" (tự động, lúc build)
 *  2. Ghi chú tay trong src/content/projects/<tên-repo>.md (tên, mô tả 3 thứ tiếng, trạng thái, thời gian...)
 *
 * Cùng tên (không phân biệt hoa thường) thì gộp làm một: chữ lấy từ ghi chú tay, số liệu lấy từ GitHub.
 * Project chỉ có ghi chú tay (chưa có repo) vẫn hiện, kèm trạng thái "Dự kiến" / "Đang làm".
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { getPortfolioRepos, type Repo } from './github';
import type { Localized, ProjectStatus } from './schemas';

export interface Project {
  slug: string;
  repoName: string;
  title: Localized;
  description: Localized;
  status?: ProjectStatus;
  period?: string;
  stack: string[];
  featured: boolean;
  order: number;
  /** Ghi chú tay (có thể không có) */
  note?: CollectionEntry<'projects'>;
  /** Dữ liệu GitHub (không có nếu repo chưa công khai hoặc chưa gắn topic) */
  github?: Repo;
}

let pending: Promise<Project[]> | undefined;

export function getProjects(): Promise<Project[]> {
  pending ??= load();
  return pending;
}

async function load(): Promise<Project[]> {
  const [notes, repos] = await Promise.all([getCollection('projects'), getPortfolioRepos()]);
  const bySlug = new Map<string, Project>();

  for (const note of notes) {
    const d = note.data;
    const slug = d.repo.toLowerCase();
    bySlug.set(slug, {
      slug,
      repoName: d.repo,
      title: d.title,
      description: d.description,
      status: d.status,
      period: d.period,
      stack: d.stack,
      featured: d.featured,
      order: d.order,
      note,
    });
  }

  for (const repo of repos) {
    const existing = bySlug.get(repo.slug);
    if (existing) {
      existing.github = repo;
      existing.repoName = repo.name;
    } else {
      bySlug.set(repo.slug, {
        slug: repo.slug,
        repoName: repo.name,
        title: repo.name,
        description: repo.description,
        stack: repo.language ? [repo.language] : [],
        featured: false,
        order: 1000,
        github: repo,
      });
    }
  }

  // Project khai báo tay theo `order`, sau đó repo GitHub còn lại theo ngày cập nhật mới nhất
  return [...bySlug.values()].sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return (b.github?.updatedAt ?? '').localeCompare(a.github?.updatedAt ?? '');
  });
}
