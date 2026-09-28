/**
 * Chuẩn hóa chữ để tìm kiếm: bỏ dấu tiếng Việt, đ → d, chữ thường, gộp khoảng trắng.
 * "Tối ưu OSPF" và "toi uu ospf" cho cùng một kết quả.
 * Dùng chung cho lúc build (tạo chỉ mục) và trên trình duyệt (xử lý từ khóa).
 */
export function searchKey(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}
