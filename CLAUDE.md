# Website thương hiệu cá nhân — Phạm Nghĩa Trọng

File này là bản mô tả yêu cầu cho Claude Code. Đọc hết trước khi viết code.
Trả lời người dùng bằng tiếng Việt, không dùng emoji/icon trong chat.

Giao diện đã được chủ site duyệt (bản 25/09/2026). Bản mẫu nằm trong thư mục
`design-reference/` — mở các file `.dc.html` để xem cấu trúc, màu, khoảng cách
và nội dung. Đó là file thiết kế, **không** phải code chạy thật: không copy
nguyên file, dựng lại bằng Astro theo đúng bố cục và style trong đó.
Khi file này và bản mẫu mâu thuẫn, **file này đúng**.

## 1. Mục tiêu

1. **CV online cho nhà tuyển dụng** — trang chủ chính là CV (trang "Hồ sơ").
   Mở ra thấy ngay: ảnh, tên, vai trò, thông tin liên hệ, mạng xã hội, định hướng nghề nghiệp, project, kỹ năng.
2. **Blog** — bài lab, tự động hóa mạng, tối ưu mạng bằng code, ngoại ngữ, hành trình sinh viên.
3. **Project** — danh sách repo GitHub.

**Không** làm: bán khóa học, bảng giá, form đăng ký, thanh toán, nút tải CV PDF, trang "Liên kết" riêng.

Chủ site: sinh viên Viễn thông, hướng Network Automation.
Ba từ khóa lặp lại nhất quán: **Lab thật · Tự động hóa · Tối ưu mạng**.

## 2. Ràng buộc bắt buộc

- **Chi phí 0 đồng** ngoài tên miền (~300.000 đ/năm). Không dịch vụ trả phí, không máy chủ.
- **Chủ site tự sửa và đăng bài được mà không cần AI**: bài viết và dữ liệu CV là file Markdown/JSON; sửa trên GitHub (web editor), commit, site tự build lại.
- **Trung thực trong nội dung**: không ghi "chuyên gia"; không ghi chứng chỉ chưa thi là đã đạt (CCNA ghi "Đang ôn"). Kỹ năng đang học ghi rõ "(đang học)".

## 3. Công nghệ (đã chốt)

| Hạng mục | Chọn | Ghi chú |
|---|---|---|
| Framework | **Astro** (bản ổn định mới nhất) | i18n routing, content collections, gần như không gửi JS |
| Style | CSS thuần với custom properties, không Tailwind | Mọi màu/khoảng cách trong `src/styles/tokens.css` |
| Hosting | **GitHub Pages** + GitHub Actions | Tên miền riêng + HTTPS |
| Dữ liệu project | GitHub REST API **gọi lúc build** | Dùng `GITHUB_TOKEN` của Actions; lỗi API thì dùng `src/data/github-cache.json`, không làm hỏng build |
| Build lại | Mỗi lần push + cron **mỗi ngày 1 lần** | |
| Lượt xem bài viết | **GoatCounter** bản miễn phí, hiện số lượt xem công khai | Kiểm tra điều khoản; nếu không dùng được thì ẩn số lượt xem |
| Icon giao diện | SVG nội tuyến kiểu nét (Lucide) | Không dùng emoji |
| Logo mạng xã hội | Gói **`simple-icons`** (logo chính thức) | Dùng làm icon nút mạng xã hội |
| Tên miền | `.com`, file `CNAME` | |

Không thêm thư viện nếu không thật sự cần. Không dùng React/Vue.

## 4. Ngôn ngữ

| Mã | Ngôn ngữ | Đường dẫn |
|---|---|---|
| `vi` | Tiếng Việt (mặc định) | `/` |
| `en` | English | `/en/` |
| `zh-hant` | 繁體中文 | `/zh-hant/` |

- **Dịch đủ 3 thứ tiếng**: menu, toàn bộ trang Hồ sơ (CV), trang Project. Bản dịch EN và 繁中 cho CV đã có sẵn trong `design-reference/Main.dc.html` (đối tượng `D` trong script) — dùng lại.
- **Blog**: viết tiếng Việt trước, bản dịch tùy chọn. Bài chưa có bản dịch thì hiện bản tiếng Việt kèm dòng thông báo (bằng ngôn ngữ đang xem), **không** trả 404.
- Chuỗi giao diện trong `src/i18n/{vi,en,zh-hant}.json`. Máy tính và điện thoại dùng chung một bộ bản dịch.
- `<html lang>` và `hreflang` đúng từng ngôn ngữ. Chữ Hán dùng Noto Sans TC làm dự phòng.
- **Mỗi bản ngôn ngữ chỉ dùng đúng ngôn ngữ đó** — cả chữ hiển thị lẫn chữ ẩn (aria-label, title, alt, mô tả, tiêu đề trang), kể cả trang 404 (`/en/404/`, `/zh-hant/404/`; trang 404 chung tự chuyển hướng theo tiền tố đường dẫn).
  Ngoại lệ được phép: họ tên chủ site; tên thương hiệu (GitHub, LinkedIn...); thuật ngữ kỹ thuật và tên sản phẩm (VLAN, OSPF, running-config, script, Python, CCNA, IELTS Academic, Windows Server...); "Blog" trong tiếng Việt; nhãn nút chọn ngôn ngữ (VI · EN · 中文 — viết bằng chính ngôn ngữ đó, chuẩn quốc tế; chú thích title/aria-label của nút theo ngôn ngữ trang); bài blog chưa dịch (hiện bản tiếng Việt kèm thông báo).
  Tiếng Việt: dùng "Dự án" (không "Project"), "Kỹ sư mạng", "Sao lưu", "tệp", "lập trình", "Tiếng Anh / Tiếng Trung". Kiểm tra lại bằng cách quét dist/ tìm chữ có dấu tiếng Việt trong en/zh-hant và chữ Hán trong vi/en.
- Nút chuyển ngôn ngữ giữ nguyên trang đang xem.

## 5. Sơ đồ trang

```
/                    Hồ sơ (CV) — trang chủ
/projects/           Danh sách repo GitHub (lọc theo topic `portfolio`)
/projects/[slug]/    Chi tiết project: README render từ GitHub + ghi chú riêng (tùy chọn)
/blog/               Danh sách bài: lọc theo 5 trụ cột, ô tìm kiếm, lượt xem
/blog/[slug]/        Bài viết: mục lục, thời gian đọc, lượt xem, bài liên quan
/blog/tag/[tag]/     Bài theo trụ cột
/404                 Trang lỗi có menu
/rss.xml             RSS blog (tiếng Việt)
/sitemap-index.xml
```

Mỗi trang có bản `/en/...` và `/zh-hant/...`.

Menu chỉ có 3 mục: **Hồ sơ** (Profile / 個人簡介), **Dự án** (Projects / 專案), **Blog** (Blog / 部落格) + ô chọn ngôn ngữ.

### Năm trụ cột blog (tag cố định)

| Tag | Tên |
|---|---|
| `lab` | Lab thực hành |
| `automation` | Tự động hóa |
| `optimization` | Tối ưu mạng |
| `language` | Ngoại ngữ |
| `journey` | Hành trình |

## 6. Giao diện (đã duyệt)

### Chữ

- **Một font duy nhất: Roboto, chỉ độ đậm 400.** Không in đậm ở bất kỳ đâu (kể cả tiêu đề, nút, nhãn). Phân cấp bằng cỡ chữ, màu và chữ in hoa.
- Chữ Hán: Noto Sans TC 400.
- **Mọi nội dung có thể dài nhiều dòng đều căn đều** (`text-align: justify`), kể cả tiêu đề dòng (tên project, tên trường...). Giá trị nằm bên phải một dòng nhãn — giá trị thì căn đều, dòng cuối vẫn nằm bên phải (`text-align-last: right`). Chỉ tiêu đề mục (`.sec-h`) căn trái. Dòng ngắn dễ bị giãn khoảng trắng xấu (vd. danh sách công nghệ + link repo) thì tách thành nhiều dòng riêng, không để xuống dòng.
- **Tên chủ site viết IN HOA** (`text-transform: uppercase`, dữ liệu vẫn viết thường trong `profile.json`), luôn nằm trên một dòng.
- **Dấu đầu dòng màu nâu** (`--brown-line`) ở đầu mỗi dòng trong danh sách: **ngôi sao** (`.star`) cho Kỹ năng, Kỹ năng mềm, Ngoại ngữ; **chấm tròn** (`.dot`) cho mọi danh sách khác (Thông tin, Định hướng, Project, Học vấn, Chứng chỉ, Bài viết...). Chữ xuống dòng thẳng hàng với chữ dòng đầu.
- Tiêu đề mục (`.sec-h`): 13px, IN HOA, giãn chữ `.12em`, màu xanh chính, đường kẻ mảnh bên dưới.

### Màu (`src/styles/tokens.css`)

| Biến | Giá trị | Dùng cho |
|---|---|---|
| `--green` | `#2A6E47` | Thanh menu, tiêu đề mục, link, nút mạng xã hội |
| `--green-hover` | `#368A58` | Hover của mọi thứ màu xanh, viền khi hover |
| `--green-soft` | `#E4F0E7` | Mục menu đang chọn, nhãn trụ cột blog |
| `--brown` | `#E89D58` | Mốc thời gian, nhãn phụ (nâu sáng) |
| `--brown-line` | `#7A4B28` | Vạch trái của mục menu đang chọn, viền focus |
| `--ground` | `#FAF8F4` | Nền nút ngôn ngữ đang chọn (nền trang giờ là nền chuyển động tối) |
| `--panel` | `#FFFFFF` | Nút nền trắng (ô trên site dùng kính `--glass-*`) |
| `--ink` | `#F1F6F3` | Chữ chính (sáng — giao diện tối) |
| `--muted` | `#D2DDD6` | Chữ phụ |
| `--accent` | `#43C977` | Chữ nhấn xanh trên nền tối: tiêu đề mục, link, vai trò |
| `--marker` | `#E89D58` | Dấu chấm / sao đầu dòng, viền focus |
| `--line` | trắng 16% / 9% | Viền / đường kẻ giữa các dòng |
| `--ok` | `#43C977` | Trạng thái "Đang làm / Đang ôn" |
| `--plan` | `#EADAC3` | Trạng thái "Dự kiến / Kế hoạch" |

**Giao diện tối** (thay cho giao diện sáng ban đầu): nền chuyển động tối + ô kính kiểu Apple, chữ sáng. `--green` (#2A6E47) chỉ dùng cho khối nền đặc (thanh menu, nút); chữ xanh trên nền tối dùng `--accent`. Tương phản chữ đạt WCAG AA.

### Nền chuyển động (thay cho nền `--ground`)

- Toàn site dùng **nền mạng lưới điểm nối vẽ bằng canvas** (`src/components/BackgroundNetwork.astro`), cố định phía sau nội dung, mô phỏng video `Boot Logo.mp4` nhưng luôn nét và chỉ vài KB. Không dùng file video.
- **Luôn tự chạy khi vào trang**, kể cả khi máy người xem bật "giảm chuyển động". **Không có nút dừng** (chủ site đã quyết định bỏ). Tự dừng khi tab bị ẩn, chạy lại khi quay về tab.
- Chỉnh mật độ, tốc độ, màu: sửa `CONFIG` trong component.
- **Mọi ô (panel, thân bài, mục lục, README, menu lọc, ô tìm kiếm, dòng nổi lên khi trỏ chuột) dùng kính kiểu Apple**: kính rất trong, **màu đều khắp ô** (trắng 6% + lớp tối 8%, không có vùng sáng ở góc), viền trắng 20% đều bốn cạnh, nhòe 10px. Token `--glass-*` trong `tokens.css`. Không bỏ lớp tối trong kính — đó là thứ giữ cho chữ sáng đủ tương phản. Ô nhỏ nằm trong ô kính dùng `--glass-inner`. Khối code trong bài dùng theme `github-dark`.
- Chữ nằm **trực tiếp trên video** dùng `--on-video` / `--on-video-muted` + bóng chữ `--on-video-shadow`; dấu chấm/sao trên video dùng `--brown-on-video`; trạng thái dùng `--ok-on-video` / `--plan-on-video`. Chữ dài (thân bài, README, ghi chú) luôn đặt trong ô trắng. Dòng bấm được khi trỏ chuột nổi lên nền trắng thì chữ trở lại màu tối.

### Thanh menu (ngang, ở trên cùng)

- Khung nổi: nền `--green`, bo góc 20px, cách mép trên 16px, rộng tối đa 1248px, căn giữa, **cố định khi cuộn** (sticky).
- Mỗi mục là một **ô riêng**: viền `rgba(255,255,255,.18)`, bo 12px, cao 48px, icon + chữ, cách nhau 8px. Hover: nền sáng nhẹ, viền rõ hơn.
- Mục đang xem: nền `--green-soft`, chữ `--green`, vạch trái 3px `--brown-line`.
- Góc phải: ô chọn ngôn ngữ gồm 3 nút VI / EN / 中文.
- **Không** có nút thu gọn menu, **không** có avatar/tên trong menu.
- **Điện thoại**: cùng thanh xanh nổi, 3 mục + 1 ô ngôn ngữ xếp ngang, mỗi ô icon ở trên, chữ 12px ở dưới; ô ngôn ngữ bấm để xoay VI → EN → 中文. Không dùng nút ☰ hay ngăn trượt.

### Hiệu ứng hover — áp dụng toàn website

**Chỉ** ô/dòng/thẻ/nút **bấm vào là chuyển sang trang khác** (trong site hoặc trang ngoài như mạng xã hội, GitHub) mới nổi lên. Link chỉ mở ứng dụng (điện thoại `tel:`, email `mailto:`) **không** nổi lên và **không đổi màu** (giữ cùng màu với nội dung cùng mức); nút chỉ mở menu thì không nổi lên, chỉ đổi màu nền. **Nội dung cùng mức luôn cùng màu.** Dòng chỉ để đọc thì không có hiệu ứng. Không áp dụng cho các mục trong thanh menu (thanh menu có hover riêng):

```css
transition: transform .18s ease-out, box-shadow .18s ease-out, border-color .18s ease-out;
:hover { transform: translateY(-3px); box-shadow: 0 12px 24px -16px rgba(42,110,71,.55);
         border-color: #368A58; background-color: #FFFFFF; }
```

Nút: nhích 2px. Chỉ ô được trỏ nổi lên, các ô khác đứng yên. Tắt hết khi `prefers-reduced-motion`.

### Trang Hồ sơ — máy tính (≥ 1024px)

Nội dung rộng tối đa 1280px, căn giữa. Lưới 2 cột: **trái 340px**, **phải phần còn lại**, cách nhau 56px.

**Mỗi mục lớn nằm trong một ô kính mờ riêng** (`--glass-bg`, viền `--glass-border`, `--glass-blur`, `--glass-shadow`, bo 16px, padding 20px 24px; điện thoại 16px 12px), các ô cách nhau 20px (điện thoại 16px). Dòng cuối trong ô không có đường kẻ dưới.

**Cột trái** — các ô xếp dọc:
1. Ảnh đại diện **tỷ lệ 3:4**, rộng hết khung, bo 12px.
2. Tên (28px, IN HOA, `--ink`, một dòng), vai trò (15px, `--green`).
3. **Thông tin**: Ngày sinh, Điện thoại, Email, Khu vực — cả 4 dòng một hàng, nhãn trái, giá trị phải (giá trị 14px, khoảng đệm hẹp để email vừa một dòng).
4. **Mạng xã hội**: 6 nút **nền xanh `--green`, chữ và logo trắng**, lưới 2 cột: GitHub, LinkedIn, YouTube, TikTok, Instagram, Facebook.
5. **Kỹ năng**: theo nhóm — Mạng, Công cụ lab, Tự động hóa, Hệ thống, Tối ưu mạng, Ứng dụng AI. Mỗi nhóm: tên nhóm (nhỏ, xám) và danh sách cách nhau dấu phẩy. **Không dùng viên nhãn (chip).**
6. **Kỹ năng mềm**: mỗi kỹ năng một dòng.
7. **Ngoại ngữ**: tên ngôn ngữ trái, trình độ phải.

**Cột phải** — các ô xếp dọc:
1. **Giới thiệu**: đoạn tóm tắt 17px.
2. **Định hướng nghề nghiệp**: 3 dòng (Ngắn hạn / Trung hạn / Dài hạn) + 2 ô "Vị trí mong muốn", "Có thể bắt đầu".
3. **Project**: mỗi dòng = cột mốc 150px (thời gian + trạng thái màu) | tiêu đề, mô tả, dòng nhỏ "công nghệ · github.com/handle/repo".
4. **Học vấn**: cùng kiểu dòng.
5. **Chứng chỉ và mục tiêu**: cột mốc = tháng/năm | tên chứng chỉ ··· trạng thái (màu).
6. **Bài viết mới**: 3 bài gần nhất, cùng kiểu dòng, có "Xem tất cả" bên phải tiêu đề.

Chân trang: một dòng căn giữa "© 2026 Phạm Nghĩa Trọng · Lab thật · Tự động hóa · Tối ưu mạng".

**Không** có: dòng "CV · cập nhật…", nút Tải CV, nút Liên hệ, khung `R1# show version`, ghi chú kỹ thuật kiểu "dữ liệu lấy từ GitHub khi build".

### Trang Hồ sơ — điện thoại (< 1024px)

Một cột, thứ tự: ảnh 3:4 (165×220) + tên + vai trò **căn giữa** → Thông tin → Mạng xã hội (2 cột) → Giới thiệu → Định hướng nghề nghiệp → Project → Học vấn → Kỹ năng → Kỹ năng mềm → Ngoại ngữ → Chứng chỉ và mục tiêu → Bài viết mới → chân trang. Mốc thời gian nằm dòng trên, nội dung dòng dưới. Tên không được xuống dòng.

### Trang Blog

Tiêu đề "Blog" và ô tìm kiếm bên phải (không có dòng `~/blog`, không có đoạn mô tả hiển thị — mô tả chỉ dùng cho thẻ meta và RSS). Lọc trụ cột bằng **một nút xổ xuống đặt cạnh chữ "Blog"**, mặc định "Tất cả"; menu gồm "Tất cả" + 5 trụ cột, mỗi mục có số bài (không dùng hàng nút). Danh sách dạng bảng: Ngày | Tiêu đề + kênh gốc | Trụ cột | Lượt xem.
- Nhãn trụ cột: **một màu duy nhất** (`--green-soft` nền, `--green` chữ), **góc vuông** (không bo).
- Mỗi dòng bấm được nên có hiệu ứng hover chung.

## 7. Dữ liệu và cách chủ site tự cập nhật

```
src/data/
  profile.json       # tên, vai trò, tóm tắt, ngày sinh, điện thoại, email, khu vực,
                     # handle, GITHUB_USERNAME, link 6 mạng xã hội — MỘT chỗ duy nhất
  career.json        # 3 giai đoạn định hướng + vị trí mong muốn + thời điểm bắt đầu
  skills.json        # nhóm kỹ năng, kỹ năng mềm, ngoại ngữ
  education.json
  goals.json         # chứng chỉ + trạng thái (dang-on / dat / ke-hoach) + tháng dự kiến
  github-cache.json
src/content/
  blog/{vi,en,zh-hant}/<slug>.md
  projects/<repo>.md # ghi chú thêm cho project (tùy chọn)
```

Mỗi file JSON chứa đủ 3 ngôn ngữ cho từng chuỗi (`{ "vi": "...", "en": "...", "zh-hant": "..." }`). Nội dung ban đầu lấy từ `design-reference/Main.dc.html`.

Frontmatter bài blog (validate bằng schema, build báo lỗi rõ ràng):

```yaml
title: "Dựng lab VLAN + Inter-VLAN routing từ con số 0"
description: "Một câu tóm tắt"
date: 2026-10-05
tags: [lab]
cover: ./images/vlan-topology.png   # tùy chọn
draft: false
```

Viết **`HUONG-DAN-DANG-BAI.md`** (tiếng Việt, cho người không biết code): tạo bài mới trên GitHub web, chèn ảnh, thêm bản dịch, sửa thông tin CV trong `src/data/`, xem site cập nhật và xem lỗi build ở tab Actions.

## 8. Project từ GitHub

- Lấy repo public của `GITHUB_USERNAME` có topic `portfolio`.
- Trang Hồ sơ hiện 3 project theo `career.json`/`projects/*.md` (thời gian, trạng thái, mô tả); trang `/projects/` hiện đủ: tên, mô tả, ngôn ngữ, ngày cập nhật, topics, link.
- Trang chi tiết render README, đổi link ảnh tương đối thành tuyệt đối.
- Topic lọc repo đặt ở `profile.json → githubTopic` (mặc định `portfolio`).
- Project khai báo tay trong `src/content/projects/<repo>.md` nhưng chưa có repo (hoặc repo chưa gắn topic) **vẫn hiện** ở `/projects/` và trang chi tiết, kèm dòng "đang lên kế hoạch". Trùng tên repo thì gộp: chữ lấy từ file tay, số liệu + README lấy từ GitHub.
- Dòng `github.com/...` trên trang Hồ sơ chỉ hiện khi repo thật sự có trên GitHub (không trỏ tới repo chưa tồn tại).

## 8b. Lượt xem (GoatCounter) — đã làm

- Điều khoản đã kiểm tra (26/09/2026): bản miễn phí dùng được cho website cá nhân; không cookie → không cần hộp thông báo cookie.
- Mã GoatCounter đặt ở `src/data/site.json → "goatcounter"` (chỉ phần mã, vd. `phamnghiatrong`). **Để trống = không đếm, không hiện số lượt xem** (và không tải script bên ngoài).
- Chủ site phải tự tạo tài khoản tại goatcounter.com và bật **Settings → "Allow adding visitor counts on your website"**, nếu không số lượt xem sẽ không hiện.
- 3 bản ngôn ngữ của một bài đếm chung vào đường dẫn tiếng Việt `/blog/<tên>/`. Số hiện ở: cột "Lượt xem" trang Blog, dòng thông tin bài viết, "Bài viết mới" trên trang Hồ sơ. Chạy thử trên máy (localhost) không bị đếm.
- Code: `src/components/Analytics.astro` (gắn script + điền số), `src/components/ViewCount.astro` (chỗ hiện số).

## 8c. SEO — đã làm (bước 6)

- `/sitemap-index.xml` → `/sitemap-0.xml` tự viết (`src/pages/sitemap-*.xml.ts`): chỉ trang canonical, kèm hreflang; bài chưa dịch không liệt kê bản EN/繁中. `/robots.txt` trỏ tới sitemap.
- Ảnh chia sẻ (Open Graph 1200×630) `public/og/og-<ngôn ngữ>.jpg`, tạo bằng `npm run og` (script `scripts/make-og.mjs`, cần Edge/Chrome; lấy chữ từ profile.json + i18n). Bài có ảnh bìa thì dùng ảnh bìa.
- JSON-LD: `Person` + `WebSite` ở trang Hồ sơ, `BlogPosting` ở bài viết. Trang 404 có `noindex`. Có `apple-touch-icon.png`.
- Lighthouse mobile (26/09/2026, trang chủ + bài thử): Hiệu năng 99 · Trợ năng 100 · Thực hành tốt 96 · SEO 100. Điểm 96 do GoatCounter trả 404 cho bài chưa có lượt xem (lỗi console) — hết khi bài đã có người xem.
- Hiệu năng phụ thuộc nền chuyển động: giữ cách vẽ đã tối ưu (nền tĩnh bằng CSS, gom đường nối theo độ sáng, 30 fps). Thêm hiệu ứng mới vào canvas thì chấm lại Lighthouse.
- Mọi URL tuyệt đối (canonical, og:image, sitemap) đang dùng `https://example.com` cho tới khi có tên miền (bước 7).

## 8d. Triển khai — đã làm (bước 7)

- Repo công khai `phamnghiatrong/phamnghiatrong.github.io`, nhánh `main`. Site: https://phamnghiatrong.github.io (26/09/2026).
- `.github/workflows/deploy.yml`: build + đưa lên Pages khi push lên `main`, mỗi ngày 08:00 giờ VN (cron `0 1 * * *`), hoặc bấm tay (Actions → Deploy → Run workflow). `GITHUB_TOKEN` của Actions dùng cho GitHub API.
- Settings → Pages → Source phải là **GitHub Actions** (không dùng "Deploy from a branch").
- Địa chỉ site ở `src/data/site.json → "url"` (astro.config đọc từ đây). Tên miền riêng: đổi `url` → build tự ghi `dist/CNAME`; trỏ DNS (A: 185.199.108.153, .109.153, .110.153, .111.153; `www` CNAME → phamnghiatrong.github.io); Settings → Pages → Custom domain + Enforce HTTPS.
- GitHub tự tắt lịch chạy hằng ngày nếu repo không có hoạt động 60 ngày — khi đó bật lại ở tab Actions.
- Commit dùng email `phamnghiatrong1412@gmail.com` (cấu hình riêng của repo). `THONG-TIN-CA-NHAN.md` và `.claude/` không đưa lên repo.

## 8e. Tài liệu — đã làm (bước 8)

- `HUONG-DAN-DANG-BAI.md`: đăng / sửa / ẩn / xoá bài trên GitHub web, Markdown, chèn ảnh (`src/content/blog/vi/images/`), bản dịch, sửa CV trong `src/data/`, ảnh đại diện (`assets/avatar.jpg`), project, đọc lỗi ở tab Actions (thông báo lỗi trích đúng từ build thật).
- `README.md`: tổng quan kỹ thuật, lệnh, cấu trúc, triển khai.
- Ngày không có thật trong bài (vd. `2026-13-45`) bị chặn ở `src/lib/blog.ts → checkDates` (YAML tự cộng dồn thành ngày khác nếu không kiểm tra).

## 8f. Trang quản trị /admin/ (Sveltia CMS)

- `public/admin/index.html` (nạp `@sveltia/cms@0.221` từ unpkg) + `public/admin/config.yml`. Không cần máy chủ: đăng nhập bằng fine-grained token (chỉ repo này, Contents: Read and write), lưu = commit vào `main` → Actions build.
- Mục: Bài viết (i18n `multiple_folders`, bản dịch tuỳ chọn), Project, Thông tin CV (profile, career, education, skills, goals).
- Ảnh bài viết lưu ở `src/content/blog/vi/images/`, đường dẫn ghi vào bài `../vi/images/...` (dùng được cho mọi ngôn ngữ).
- Để trang quản trị sửa được, dữ liệu CV đã chuẩn hoá: `education.json` → `{ "schools": [...] }`, `goals.json` → `{ "goals": [...] }`, mọi chữ đều dạng `{vi, en, zh-hant}`. Ô tuỳ chọn rỗng (`""`) được coi như không có.
- Đổi cấu trúc dữ liệu thì sửa **cả** `config.yml` lẫn schema (`src/content.config.ts`, `src/lib/data.ts`). `/admin/` bị chặn trong robots.txt và có `noindex`.

## 9. Chất lượng — điều kiện nghiệm thu

- Lighthouse mobile ≥ 90 (Performance, Accessibility, Best Practices, SEO) cho trang chủ và một bài blog.
- Không cuộn ngang ở 360px.
- Mỗi trang có `title`, `description`, Open Graph, `canonical`, `hreflang`.
- Ảnh qua `astro:assets`, có `width/height`, lazy-load. Ảnh đại diện nguồn ≥ 900×1200.
- `npm run build` không lỗi, không link hỏng.
- Đối chiếu từng trang với `design-reference/` trước khi báo xong.

## 10. Thứ tự làm

1. Khởi tạo Astro, i18n 3 ngôn ngữ, `tokens.css`, font Roboto, thanh menu ngang (máy tính + điện thoại). **Dừng cho chủ site xem.**
2. Trang Hồ sơ đọc từ `src/data/*.json`, đủ 3 ngôn ngữ, bố cục máy tính và điện thoại.
3. Blog: content collection, danh sách, lọc, tìm kiếm, trang bài, tag, RSS, fallback ngôn ngữ.
4. Project từ GitHub + cache.
5. Lượt xem (GoatCounter).
6. SEO, sitemap, OG, ảnh, Lighthouse.
7. GitHub Actions deploy + cron + tên miền.
8. `HUONG-DAN-DANG-BAI.md` và `README.md`.

## 11. Nội dung còn thiếu (giá trị tạm, đánh dấu `TODO` trong `profile.json`)

- [ ] Ảnh đại diện 3:4 (≥ 900×1200)
- [ ] Ngày sinh, số điện thoại, email, khu vực
- [ ] Handle chung cho mọi nền tảng + link 6 mạng xã hội
- [ ] Tên trường, năm vào, năm tốt nghiệp
- [ ] Tên miền (đang dùng tạm https://phamnghiatrong.github.io)
- [ ] Bài blog đầu tiên
- [ ] Duyệt lại bản dịch EN và 繁中
- [x] Tài khoản GoatCounter `phamnghiatrong` + mã trong `src/data/site.json` + đã bật "Allow adding visitor counts" (26/09/2026)
