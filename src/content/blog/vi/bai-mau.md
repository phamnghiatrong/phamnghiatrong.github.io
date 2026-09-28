---
title: "Bài mẫu: cách viết một bài blog"
description: "Khuôn mẫu để sao chép khi viết bài mới — xóa hoặc giữ nguyên draft: true."
date: 2026-09-26
tags: [journey]
# cover: ./images/ten-anh.png      # ảnh bìa (tùy chọn), đặt trong thư mục images cạnh file này
# coverAlt: "Mô tả ngắn nội dung ảnh"
# channel: "LinkedIn"              # kênh đăng gốc (tùy chọn)
draft: true
---

Đây là **bài mẫu**. Vì có `draft: true` ở trên nên bài này **không** hiện trên website, chỉ hiện khi chạy thử trên máy. Muốn viết bài mới: sao chép file này, đổi tên file (chữ thường, không dấu, nối bằng gạch ngang, ví dụ `dung-lab-vlan.md`), sửa phần giữa hai dòng `---` và viết nội dung bên dưới.

## Tiêu đề mục lớn

Mỗi dòng bắt đầu bằng `##` là một mục lớn và tự động có trong **mục lục**. Mục nhỏ hơn dùng `###`.

### Mục nhỏ

- Gạch đầu dòng dùng dấu `-`
- Chữ đậm viết trong `**hai dấu sao**` (trên website vẫn hiển thị theo kiểu chữ chung)
- Link: [trang GitHub](https://github.com/phamnghiatrong)

1. Danh sách có số
2. Viết số rồi dấu chấm

## Chèn code

```python
from netmiko import ConnectHandler

device = {"device_type": "cisco_ios", "host": "10.0.0.1", "username": "admin", "password": "..."}
with ConnectHandler(**device) as conn:
    print(conn.send_command("show ip interface brief"))
```

Code ngắn trong câu thì đặt giữa hai dấu huyền, ví dụ `show vlan brief`.

## Chèn ảnh và bảng

Ảnh: chép file vào thư mục `images` cạnh bài viết rồi ghi `![Mô tả ảnh](./images/ten-anh.png)`.

| Thiết bị | Vai trò | IP |
| --- | --- | --- |
| R1 | Router | 10.0.0.1 |
| SW1 | Switch | 10.0.0.2 |

> Trích dẫn hoặc ghi chú quan trọng bắt đầu bằng dấu `>`.
