# Hướng dẫn đăng bài và sửa thông tin trên website

Website: **https://phamnghiatrong.github.io**
Nơi chứa nội dung: **https://github.com/phamnghiatrong/phamnghiatrong.github.io**

Bạn không cần cài gì, không cần biết code. Có 2 cách:

- **Cách 1 — Trang quản trị (dễ nhất):** https://phamnghiatrong.github.io/admin/ — điền vào ô, bấm lưu.
  Xem [mục 0](#0-trang-quản-trị-cách-dễ-nhất).
- **Cách 2 — Sửa file trên GitHub:** sửa file → bấm **Commit changes**. Xem mục 1 trở đi.

Cả hai cách: khoảng **1–2 phút** sau khi lưu, website tự cập nhật.

Nếu có gì sai, website **vẫn giữ bản cũ** (không bị hỏng), và tab **Actions** sẽ báo lỗi để bạn sửa
(xem mục 7).

---

## Mục lục

0. [Trang quản trị (cách dễ nhất)](#0-trang-quản-trị-cách-dễ-nhất)
1. [Viết bài blog mới](#1-viết-bài-blog-mới)
2. [Viết nội dung bài (Markdown)](#2-viết-nội-dung-bài-markdown)
3. [Chèn ảnh vào bài](#3-chèn-ảnh-vào-bài)
4. [Thêm bản dịch tiếng Anh / tiếng Trung](#4-thêm-bản-dịch-tiếng-anh--tiếng-trung)
5. [Sửa thông tin CV (trang Hồ sơ)](#5-sửa-thông-tin-cv-trang-hồ-sơ)
6. [Dự án (Project)](#6-dự-án-project)
7. [Xem website đã cập nhật chưa, xem lỗi](#7-xem-website-đã-cập-nhật-chưa-xem-lỗi)
8. [Việc khác](#8-việc-khác)

---

## 0. Trang quản trị (cách dễ nhất)

Địa chỉ: **https://phamnghiatrong.github.io/admin/** (dùng được trên máy tính và điện thoại).
Trang này thay bạn lưu vào GitHub, nên mọi thứ ở các mục sau (tên trụ cột, ảnh, bản dịch, lỗi build) vẫn đúng.

### Lần đầu: tạo mã đăng nhập (token) — làm một lần

1. Đăng nhập GitHub → bấm ảnh đại diện (góc phải) → **Settings** → cuối cột trái **Developer settings**
   → **Personal access tokens** → **Fine-grained tokens** → **Generate new token**.
2. Điền:
   - **Token name:** `Trang quản trị website`
   - **Expiration:** chọn thời hạn (vd. 1 năm; hết hạn thì tạo mã mới)
   - **Repository access:** **Only select repositories** → chọn `phamnghiatrong.github.io`
   - **Permissions** → **Repository permissions** → **Contents**: chọn **Read and write**
     (các quyền khác để nguyên)
3. Bấm **Generate token** → **sao chép** mã (bắt đầu bằng `github_pat_...`). Mã chỉ hiện một lần.
4. Mở https://phamnghiatrong.github.io/admin/ → bấm **Sign In Using Access Token** → dán mã → đăng nhập.

Trình duyệt sẽ nhớ mã, lần sau vào thẳng. **Bảo mật:**

- Mã này chỉ sửa được đúng repo website, không đụng tới gì khác trong tài khoản GitHub.
- **Chỉ đăng nhập trên máy / điện thoại của bạn.** Không gửi mã cho ai.
- Mất máy hoặc lỡ lộ mã: vào lại trang **Fine-grained tokens** ở trên → bấm vào mã → **Delete** → tạo mã mới.
- Không dùng nút **Sign In with GitHub** (cần máy chủ riêng, website này không có).

### Đăng bài mới

1. Cột trái chọn **Bài viết** → bấm **New** (bài mới).
2. Điền **Tiêu đề**, **Tóm tắt**, chọn **Ngày đăng**, tick **Trụ cột**.
   Tên file bài tự tạo từ tiêu đề (không dấu) — kiểm tra lại, sửa được lúc tạo, sau đó không đổi.
3. **Ảnh bìa** (tuỳ chọn): bấm để tải ảnh lên, ghi thêm **Mô tả ảnh bìa**.
4. **Nội dung**: soạn như Word — thanh công cụ có in đậm, tiêu đề (Heading 2 = mục lớn, vào mục lục),
   danh sách, link, chèn ảnh, code.
5. Chưa muốn đăng: bật **Bản nháp** (bài lưu lại nhưng chưa hiện trên website).
6. Bấm **Save** (Lưu). Sau 1–2 phút bài hiện trên website.

### Thêm bản dịch

Mở bài → phía trên ô soạn có nút ngôn ngữ **vi / en / zh-hant** → bật **en** hoặc **zh-hant** → dịch
**Tiêu đề**, **Tóm tắt**, **Nội dung** (ngày, trụ cột, ảnh tự dùng chung với bản tiếng Việt) → **Save**.
Không bật thì người xem tiếng Anh / tiếng Trung đọc bản tiếng Việt kèm dòng thông báo.

### Sửa thông tin CV, project

- **Thông tin CV** (cột trái): thông tin cá nhân & mạng xã hội, định hướng nghề nghiệp, học vấn,
  kỹ năng, chứng chỉ. Mỗi chữ có 3 ô (Tiếng Việt / English / 繁體中文). Để trống hoặc ghi `ẨN` thì mục đó
  không hiện. Danh sách (kỹ năng, chứng chỉ...) có nút thêm, xoá, kéo đổi thứ tự.
- **Dự án**: thêm / sửa dự án, chọn trạng thái, bật **Hiện trên trang Hồ sơ**.
- **Ảnh đại diện** chưa sửa được ở trang quản trị — làm theo [mục 5](#ảnh-đại-diện).

Lưu xong vẫn nên liếc tab **Actions** trên GitHub (mục 7) để chắc build thành công.

---

## 1. Viết bài blog mới

1. Mở repo trên GitHub → vào thư mục `src` → `content` → `blog` → `vi`.
2. Bấm **Add file** → **Create new file**.
3. Ô tên file: gõ tên bài, **chữ thường, không dấu, nối bằng gạch ngang**, đuôi `.md`.
   Ví dụ: `dung-lab-vlan.md`. Tên file chính là đường dẫn bài: `https://phamnghiatrong.github.io/blog/dung-lab-vlan/`
4. Dán khuôn dưới đây vào ô nội dung rồi sửa:

```markdown
---
title: "Dựng lab VLAN + Inter-VLAN routing từ con số 0"
description: "Một câu tóm tắt bài, hiện trong danh sách và khi chia sẻ link."
date: 2026-10-05
tags: [lab]
channel: "Blog + GitHub"
draft: false
---

Đoạn mở đầu của bài...

## Mục thứ nhất

Nội dung...
```

5. Bấm **Commit changes...** → chọn **Commit directly to the main branch** → **Commit changes**.
6. Chờ 1–2 phút, mở website là thấy bài mới (xem mục 7 nếu không thấy).

### Ý nghĩa các dòng ở đầu bài (giữa hai dòng `---`)

| Dòng | Bắt buộc | Ghi gì |
|---|---|---|
| `title` | Có | Tiêu đề bài, đặt trong dấu `"..."` |
| `description` | Có | Một câu tóm tắt, trong dấu `"..."` |
| `date` | Có | Ngày đăng, dạng **năm-tháng-ngày**: `2026-10-05` |
| `tags` | Có | Một hoặc nhiều trụ cột trong ngoặc vuông, cách nhau dấu phẩy: `[lab]`, `[lab, automation]` |
| `channel` | Không | Kênh đăng gốc, vd. `"LinkedIn"`, `"YouTube"`. Không có thì xoá dòng này |
| `cover` | Không | Ảnh bìa, xem mục 3 |
| `coverAlt` | Không | Mô tả ảnh bìa (cho người khiếm thị và Google) |
| `updated` | Không | Ngày sửa lớn gần nhất, dạng `2026-10-20` |
| `draft` | Không | `true` = **bản nháp, không hiện trên website**; `false` hoặc xoá dòng = hiện |

**5 trụ cột** (chỉ dùng đúng các chữ bên trái, viết thường):

| Ghi trong `tags` | Hiện trên website |
|---|---|
| `lab` | Lab thực hành |
| `automation` | Tự động hoá |
| `optimization` | Tối ưu mạng |
| `language` | Ngoại ngữ |
| `journey` | Hành trình |

> Mẹo: file `src/content/blog/vi/bai-mau.md` là bài mẫu (đang để `draft: true` nên không hiện).
> Mở ra xem cách viết mục, danh sách, code, bảng, ảnh.

### Sửa hoặc xoá bài đã đăng

- **Sửa:** mở file bài → bấm biểu tượng **cây bút** (Edit) → sửa → **Commit changes**.
- **Ẩn tạm:** sửa `draft: false` thành `draft: true`.
- **Xoá hẳn:** mở file → bấm **...** (góc phải) → **Delete file** → **Commit changes**.
  Nếu bài có bản dịch, xoá cả file cùng tên trong `en/` và `zh-hant/`.

---

## 2. Viết nội dung bài (Markdown)

Viết như soạn văn bản thường. Một số ký hiệu:

| Muốn có | Gõ |
|---|---|
| Mục lớn (tự vào **mục lục**) | `## Tên mục` |
| Mục nhỏ | `### Tên mục nhỏ` |
| Đoạn văn mới | Để trống một dòng giữa hai đoạn |
| Gạch đầu dòng | `- nội dung` |
| Danh sách số | `1. nội dung` |
| Link | `[chữ hiện ra](https://địa-chỉ)` |
| Code ngắn trong câu | `` `show vlan brief` `` (hai dấu huyền) |
| Trích dẫn / ghi chú | `> nội dung` |

**Khối code** (lệnh, cấu hình, script): đặt giữa hai dòng ba dấu huyền, có thể ghi tên ngôn ngữ để tô màu:

````markdown
```python
from netmiko import ConnectHandler
```
````

**Bảng:**

```markdown
| VLAN | Tên | Dải địa chỉ |
| --- | --- | --- |
| 10 | Kế toán | 192.168.10.0/24 |
```

Trong trình soạn thảo của GitHub có tab **Preview** để xem trước.

---

## 3. Chèn ảnh vào bài

### Tải ảnh lên

1. Vào thư mục `src/content/blog/vi/images`.
2. Bấm **Add file** → **Upload files** → kéo ảnh vào → **Commit changes**.
3. Đặt tên ảnh **không dấu, không khoảng trắng**, vd. `vlan-topology.png`.
   Nên dùng ảnh rộng khoảng 1200–1600 px, dưới 1 MB (website tự nén và thu nhỏ thêm).

### Chèn ảnh trong nội dung

```markdown
![Sơ đồ lab VLAN với 3 máy tính và router](./images/vlan-topology.png)
```

Chữ trong ngoặc vuông là mô tả ảnh — nên ghi, giúp người khiếm thị và Google hiểu ảnh.

### Ảnh bìa (tuỳ chọn)

Thêm vào phần đầu bài:

```yaml
cover: ./images/vlan-topology.png
coverAlt: "Sơ đồ lab VLAN"
```

Ảnh bìa hiện ở đầu bài và làm ảnh xem trước khi chia sẻ link lên Facebook, Zalo, LinkedIn.

> Lỗi hay gặp: gõ sai tên ảnh (kể cả hoa/thường, đuôi `.png`/`.jpg`) → build báo lỗi không tìm thấy ảnh.

---

## 4. Thêm bản dịch tiếng Anh / tiếng Trung

Bài **luôn viết tiếng Việt trước** (trong `vi/`). Bản dịch là tuỳ chọn.

1. Vào `src/content/blog/en` (tiếng Anh) hoặc `src/content/blog/zh-hant` (tiếng Trung phồn thể).
2. **Create new file** với **đúng cùng tên file** như bản tiếng Việt, vd. `dung-lab-vlan.md`.
3. Dán nội dung đã dịch, giữ nguyên `date` và `tags`, dịch `title`, `description` và nội dung.
4. Ảnh: dùng lại ảnh của bản tiếng Việt bằng đường dẫn `../vi/images/ten-anh.png`
   (trang quản trị tự ghi đường dẫn dạng này, dùng được cho cả bản tiếng Việt).

Chưa có bản dịch thì người xem tiếng Anh / tiếng Trung vẫn đọc được bản tiếng Việt, kèm dòng thông báo
"bài này hiện chỉ có tiếng Việt" — không bị lỗi.

---

## 5. Sửa thông tin CV (trang Hồ sơ)

Tất cả nằm trong thư mục `src/data/`. Mở file → bấm **cây bút** → sửa → **Commit changes**.

| File | Chứa |
|---|---|
| `profile.json` | Tên, vai trò, đoạn giới thiệu, ngày sinh, điện thoại, email, khu vực, tài khoản GitHub, link 6 mạng xã hội |
| `career.json` | Định hướng nghề nghiệp (ngắn / trung / dài hạn), vị trí mong muốn, thời điểm có thể bắt đầu |
| `skills.json` | Nhóm kỹ năng, kỹ năng mềm, ngoại ngữ |
| `education.json` | Trường, năm học, ngành, môn học |
| `goals.json` | Chứng chỉ và mục tiêu |
| `site.json` | Địa chỉ website, mã GoatCounter |

### Quy tắc khi sửa file `.json`

- Chữ luôn nằm trong dấu ngoặc kép: `"Sinh viên"`.
- Giữa các mục có **dấu phẩy**; mục cuối cùng trong một nhóm **không** có dấu phẩy.
- Chỗ nào có 3 ngôn ngữ thì sửa đủ cả 3:

```json
"role": {
  "vi": "Sinh viên",
  "en": "Student",
  "zh-hant": "學生"
}
```

- Chữ giống nhau ở cả 3 ngôn ngữ (vd. `"Python"`) thì chỉ cần ghi một lần.
- **Ẩn một mục** (vd. không muốn hiện số điện thoại): để trống `""` hoặc ghi `"ẨN"`.
- Ngày sinh dạng `"2002-12-14"` (hoặc chỉ năm `"2002"`).

### Trạng thái chứng chỉ (`goals.json` → `status`)

| Ghi | Hiện | Màu |
|---|---|---|
| `dang-on` | Đang ôn | xanh |
| `dat` | Đã đạt | xanh |
| `ke-hoach` | Kế hoạch | nâu |

Muốn chữ khác (vd. "Đang luyện") thì thêm `"label": { "vi": "...", "en": "...", "zh-hant": "..." }`.

> **Trung thực:** chỉ đổi sang `dat` khi đã có chứng chỉ thật.

### Ảnh đại diện

1. Chuẩn bị ảnh **dọc tỉ lệ 3:4**, tối thiểu **900 × 1200 px**, đặt tên `avatar.jpg`.
2. Vào thư mục `assets` (ở ngoài cùng repo) → **Add file** → **Upload files** → kéo ảnh vào → **Commit changes**.

Website tự cắt, nén và tạo nhiều cỡ ảnh. Muốn đổi ảnh: tải ảnh mới cùng tên `avatar.jpg` đè lên.

---

## 6. Dự án (Project)

Có 2 cách để project hiện trên website:

**a) Repo GitHub (tự động).** Vào repo của project trên GitHub → bấm bánh răng cạnh **About** →
ô **Topics** thêm `portfolio` → **Save changes**. Website lấy tên, mô tả, ngôn ngữ, README mỗi ngày
một lần (8 giờ sáng) hoặc ngay lần cập nhật website tiếp theo.

**b) Khai báo tay** trong `src/content/projects/<tên-repo>.md` (dùng cho project chưa có repo, hoặc để
ghi tên / mô tả 3 thứ tiếng). Xem 3 file có sẵn làm mẫu. Các dòng quan trọng:

| Dòng | Ghi gì |
|---|---|
| `repo` | Tên repo trên GitHub (trùng tên thì tự ghép với dữ liệu GitHub) |
| `order` | Thứ tự (số nhỏ đứng trước) |
| `featured` | `true` = hiện trên trang Hồ sơ |
| `period` | Thời gian, vd. `"10 – 12/2026"` |
| `status` | `dang-lam` (Đang làm), `du-kien` (Dự kiến), `xong` (Hoàn thành) |
| `stack` | Công nghệ, vd. `[Python, Netmiko]` |
| `title`, `description` | Tên và mô tả, đủ `vi` / `en` / `zh-hant` |

Viết thêm bên dưới dòng `---` thứ hai thì phần đó hiện thành mục "Ghi chú" trên trang chi tiết project.

---

## 7. Xem website đã cập nhật chưa, xem lỗi

Sau mỗi lần **Commit changes**, mở tab **Actions** trên repo:

| Thấy | Nghĩa là |
|---|---|
| Chấm vàng xoay | Đang build, chờ 1–2 phút |
| Dấu tích xanh | Xong — website đã cập nhật (có thể cần tải lại trang, `Ctrl + F5`) |
| Dấu **X đỏ** | Có lỗi — website **vẫn giữ bản cũ**, cần sửa |

### Đọc lỗi

Bấm vào lần chạy có dấu X đỏ → bấm **build** → bấm bước **Build** (có dấu X) → kéo xuống đọc dòng màu đỏ.
Lỗi thường ghi rõ **tên file** và **chỗ sai**. Ví dụ:

| Thông báo | Nguyên nhân | Sửa |
|---|---|---|
| `Dữ liệu sai trong src/data/goals.json: mục 4 › status ...` | Ghi sai trạng thái ở mục thứ 4 | Dùng đúng `dang-on` / `dat` / `ke-hoach` |
| `blog → vi/ten-bai ... tags.0: Invalid option: expected one of "lab"\|...` | Sai tên trụ cột | Dùng đúng 5 chữ ở mục 1 |
| `Bài "vi/ten-bai": ngày date: 2026-13-45 không có thật` | Ngày không có trên lịch | Ghi đúng năm-tháng-ngày, vd. `2026-10-05` |
| `[builtin:vite-json] ... expected ',' or '}' at line 5 column 5` | File `.json` thiếu / thừa dấu phẩy hoặc dấu `"` — lỗi nằm ở **dòng 5** hoặc ngay dòng trên | Xem lại dòng được báo |
| `Bài "ten-bai" có bản en nhưng chưa có bản tiếng Việt` | Có bản dịch mà thiếu bản gốc | Tạo `vi/ten-bai.md` trước |
| `Could not find requested image ./images/ten-anh.png` | Sai tên / đường dẫn ảnh | Kiểm tra tên ảnh trong `images/` (cả chữ hoa/thường và đuôi file) |

Sửa xong **Commit** lại là tự build lần nữa.

### Build lại bằng tay

Tab **Actions** → **Deploy** (cột trái) → **Run workflow** → **Run workflow**.

---

## 8. Việc khác

- **Lượt xem:** xem thống kê chi tiết tại https://phamnghiatrong.goatcounter.com. Số lượt xem trên website
  gộp chung cả 3 bản ngôn ngữ của một bài.
- **Đổi tên miền** (khi mua, vd. `phamnghiatrong.com`): sửa `src/data/site.json` → `"url"`, rồi làm theo
  mục "Triển khai" trong `CLAUDE.md` (trỏ DNS, bật Custom domain trong Settings → Pages).
- **Lịch build hằng ngày bị tắt:** GitHub tự tắt nếu repo không có hoạt động 60 ngày. Vào tab Actions →
  **Deploy** → bấm **Enable workflow**.
- **Ảnh xem trước khi chia sẻ link** (tên + mô tả trên nền mạng lưới) lấy chữ từ `profile.json` và phần
  mô tả site. Khi đổi các chữ này, cần tạo lại ảnh bằng máy tính có cài Node.js: chạy `npm run og` trong
  thư mục dự án (xem `README.md`).
