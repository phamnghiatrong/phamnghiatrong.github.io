/**
 * Tạo ảnh xem trước khi chia sẻ link (Open Graph, 1200×630) cho 3 ngôn ngữ:
 *   public/og/og-vi.jpg, og-en.jpg, og-zh-hant.jpg
 *
 * Chạy lại khi đổi tên, mô tả hoặc từ khóa:   node scripts/make-og.mjs
 * Cần Microsoft Edge hoặc Google Chrome (Windows có sẵn Edge). Có thể chỉ định: BROWSER="đường/dẫn/trình/duyệt"
 * Nội dung lấy từ src/data/profile.json và src/i18n/*.json nên luôn khớp với site.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

const root = resolve(import.meta.dirname, '..');
const read = (p) => JSON.parse(readFileSync(join(root, p), 'utf-8'));
const profile = read('src/data/profile.json');
const LOCALES = { vi: 'vi', en: 'en', 'zh-hant': 'zh-Hant' };

const browser =
  process.env.BROWSER ||
  [
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ].find((p) => existsSync(p));
if (!browser) throw new Error('Không tìm thấy Edge/Chrome. Đặt biến BROWSER trỏ tới trình duyệt.');

const escape = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function html(locale) {
  const t = read(`src/i18n/${locale}.json`);
  const [lead] = t.site.description.split(/(?<=[.。])\s*/);
  return `<!doctype html>
<html lang="${LOCALES[locale]}"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&family=Noto+Sans+TC:wght@400&display=block">
<style>
  html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; background: #0c2530; }
  body { font-family: Roboto, 'Noto Sans TC', sans-serif; color: #f1f6f3; }
  canvas { position: absolute; inset: 0; }
  .card {
    position: absolute; left: 72px; top: 50%; transform: translateY(-50%);
    width: 760px; padding: 48px 56px; box-sizing: border-box;
    border: 1px solid rgba(255,255,255,.22); border-radius: 28px;
    background: rgba(255,255,255,.07); backdrop-filter: blur(10px) saturate(170%);
    box-shadow: 0 30px 60px -30px rgba(0,0,0,.7);
  }
  .name { margin: 0; font-size: 64px; line-height: 1.1; font-weight: 400; text-transform: uppercase; letter-spacing: .01em; white-space: nowrap; }
  .lead { margin: 22px 0 0; font-size: 30px; line-height: 1.35; color: #43c977; }
  .keys { margin: 26px 0 0; font-size: 26px; color: #e89d58; }
  .url { margin: 34px 0 0; font-size: 20px; color: #d2ddd6; letter-spacing: .02em; }
</style></head>
<body>
<canvas id="c" width="1200" height="630"></canvas>
<div class="card">
  <h1 class="name">${escape(profile.name)}</h1>
  <p class="lead">${escape(lead)}</p>
  <p class="keys">${escape(t.site.keysLine)}</p>
  <p class="url">github.com/${escape(profile.githubUsername)}</p>
</div>
<script>
  // Mạng lưới điểm nối tĩnh, giống nền trên site (hạt giống cố định → ảnh lần nào cũng như nhau)
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const c = document.getElementById('c').getContext('2d'); const W = 1200, H = 630;
  const g = c.createLinearGradient(0, 0, W * .4, H); g.addColorStop(0, '#08161d'); g.addColorStop(1, '#103846');
  c.fillStyle = g; c.fillRect(0, 0, W, H);
  const glow = c.createRadialGradient(W * .7, H * .6, 0, W * .7, H * .6, W * .6);
  glow.addColorStop(0, 'rgba(40,120,140,.35)'); glow.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = glow; c.fillRect(0, 0, W, H);
  const nodes = Array.from({ length: 110 }, () => ({ x: rnd() * W, y: rnd() * H, z: .35 + rnd() * .65 }));
  for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
    const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
    if (d > 170) continue; const z = Math.min(a.z, b.z);
    c.strokeStyle = 'rgba(175,225,240,' + (1 - d / 170) * .9 * z + ')'; c.lineWidth = .5 + z * .8;
    c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.stroke();
  }
  for (const n of nodes) { c.fillStyle = 'rgba(235,248,255,' + (.5 + n.z * .5) + ')'; c.beginPath(); c.arc(n.x, n.y, .8 + n.z * 2, 0, 7); c.fill(); }
</script>
</body></html>`;
}

const outDir = join(root, 'public', 'og');
mkdirSync(outDir, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), 'og-'));

try {
  for (const locale of Object.keys(LOCALES)) {
    const page = join(tmp, `${locale}.html`);
    writeFileSync(page, html(locale), 'utf-8');
    const png = join(tmp, `${locale}.png`);
    const out = join(outDir, `og-${locale}.jpg`);
    execFileSync(browser, [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--window-size=1200,630',
      '--virtual-time-budget=5000',
      `--user-data-dir=${join(tmp, 'profile')}`,
      `--screenshot=${png}`,
      pathToFileURL(page).href,
    ], { stdio: 'ignore' });
    // JPEG nhẹ hơn PNG ~5 lần, mạng xã hội hiển thị nhanh hơn
    await sharp(png).jpeg({ quality: 86, mozjpeg: true }).toFile(out);
    console.log('Đã tạo', out);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
