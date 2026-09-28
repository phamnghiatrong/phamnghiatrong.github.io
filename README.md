# Phạm Nghĩa Trọng — website cá nhân

**https://phamnghiatrong.github.io** · CV online · Blog · Project từ GitHub · 3 ngôn ngữ (Tiếng Việt / English / 繁體中文)


## Công nghệ

- [Astro](https://astro.build) 7 — site tĩnh, gần như không gửi JavaScript; i18n routing, content collections, Fonts API (Roboto, Noto Sans TC tải lúc build)
- CSS thuần + custom properties (`src/styles/tokens.css`), không framework CSS, không React/Vue
- Nền chuyển động vẽ bằng canvas (`src/components/BackgroundNetwork.astro`), ô kính `backdrop-filter`
- Trang quản trị `/admin/`: [Sveltia CMS](https://github.com/sveltia/sveltia-cms) (`public/admin/config.yml`), đăng nhập bằng fine-grained token (Contents: read/write), commit thẳng vào `main`
- Lượt xem: [GoatCounter](https://www.goatcounter.com) (miễn phí, không cookie)
- Hosting: GitHub Pages + GitHub Actions (build khi push và mỗi ngày 08:00 giờ VN)

Chi phí vận hành: 0 đồng (chỉ tên miền nếu mua).

## Chạy trên máy

Cần Node.js ≥ 22.12 (khuyên dùng 24 LTS).

```bash
npm install
npm run dev       # xem thử tại http://localhost:4321 (hiện cả bài draft: true)
npm run build     # build ra thư mục dist/
npm run preview   # xem bản build
```

`GITHUB_TOKEN` (tuỳ chọn) trong biến môi trường giúp lấy dữ liệu GitHub không bị giới hạn lượt gọi.
Không gọi được GitHub API thì build dùng `src/data/github-cache.json`.

## Cấu trúc

```
src/
  data/                 Dữ liệu CV (JSON, đủ 3 ngôn ngữ) — kiểm tra bằng schema, sai thì build báo rõ
    profile.json          tên, liên hệ, mạng xã hội, GitHub
    career.json skills.json education.json goals.json
    site.json             địa chỉ site (url), mã GoatCounter
    github-cache.json     dự phòng khi GitHub API lỗi (tự ghi)
  content/
    blog/{vi,en,zh-hant}/<tên-bài>.md   bài viết (vi là bản gốc bắt buộc)
    projects/<repo>.md                  project khai báo tay / ghi chú
  i18n/{vi,en,zh-hant}.json            chuỗi giao diện
  pages/[...lang]/                      mọi trang có 3 bản: /, /en/, /zh-hant/
  components/ layouts/ lib/ styles/
assets/avatar.jpg        ảnh đại diện (3:4, ≥ 900×1200)
public/                  favicon, ảnh chia sẻ (og/)
.github/workflows/deploy.yml
```

## Trang

| Đường dẫn | Nội dung |
|---|---|
| `/` | Hồ sơ (CV) |
| `/projects/`, `/projects/<repo>/` | Repo GitHub có topic `portfolio` + project khai báo tay; README render từ GitHub |
| `/blog/`, `/blog/<bài>/`, `/blog/tag/<trụ-cột>/` | Blog: lọc, tìm kiếm (không dấu), mục lục, bài liên quan, lượt xem |
| `/rss.xml` | RSS (tiếng Việt) |
| `/sitemap-index.xml`, `/robots.txt` | SEO |

Mỗi trang có bản `/en/…` và `/zh-hant/…`. Bài chưa dịch hiện bản tiếng Việt kèm thông báo, canonical trỏ về bản tiếng Việt.

## Triển khai

Push lên `main` → Actions build → GitHub Pages. Settings → Pages → Source: **GitHub Actions**.
Tên miền riêng: sửa `src/data/site.json → url` (tự tạo `CNAME`), trỏ DNS, bật Custom domain + Enforce HTTPS.
