// Định nghĩa dữ liệu mẫu của danh sách người dùng
export const MOCK_USERS_DATA = [
  { id: 1, name: 'Bảo', email: 'bao@example.com', status: 'active' },
  { id: 2, name: 'Ngọc', email: 'ngoc@example.com', status: 'active' },
  { id: 3, name: 'Tài', email: 'tai@example.com', status: 'inactive' },
];

// Định nghĩa dữ liệu mẫu cho một bài post cụ thể
export const MOCK_POST_DETAIL = {
  postId: 'p101',
  title: 'Setup MSW thành công!',
  content: 'Dữ liệu này được lấy từ file mockData.ts.',
  author: 'Gemini AI',
};

export const MOCK_PHONE_MODELS = [
  { id: 'pm1', name: 'iPhone 14 Pro', aspect_ratio: '9/18', border_radius: '3rem', camera_position: '{"top": "1rem", "right": "1rem"}',isActive: true, creatAt: '' },
  { id: 'pm2', name: 'Galaxy S23 Ultra', aspect_ratio: '9/19.5', border_radius: '2.75rem', camera_position: '{"top": "1rem", "left": "1rem"}',isActive: true, creatAt: '' },
  { id: 'pm3', name: 'Pixel 7 Pro', aspect_ratio: '9/19', border_radius: '2.5rem', camera_position: '{"top": "1rem", "center": true}',isActive: true, creatAt: '' },
];

export const MOCK_CASE_TYPES = [
  { id: 'ct1', name: 'Ốp lưng dẻo iPhone 14 Pro', description: 'Ốp lưng làm từ chất liệu TPU dẻo dai, chống sốc tốt.', image_url: '', creatAt: '' , price: 299000},
  { id: 'ct2', name: 'Ốp lưng cứng', description: 'Ốp lưng làm từ nhựa cứng PC, bảo vệ máy tối ưu.', image_url: '', creatAt: '' },
  { id: 'ct3', name: 'Ốp lưng ví', description: 'Ốp lưng kiêm ví đựng thẻ, tiện lợi khi di chuyển.', image_url: '', creatAt: '' },
];

export const MOCK_INVENTORY_ITEMS = [
    { id: 'inv1', quantity: 200, phone_model_id: 'pm1', case_type_id: 'ct1',creatAt: '', updateAt: '' },
    { id: 'inv2', quantity: 200, phone_model_id: 'pm2', case_type_id: 'ct2',creatAt: '', updateAt: '' },
    { id: 'inv3', quantity: 200, phone_model_id: 'pm3', case_type_id: 'ct3',creatAt: '', updateAt: '' },
];

export const MOCK_PRODUCT_1 = { 
    id: 'inv1', phone_model_id: 'pm1', case_type_id: 'ct1', case_type_name: 'Ốp lưng dẻo iPhone 14 Pro', case_type_price: 299000, case_type_description: 'Ốp lưng làm từ chất liệu TPU dẻo dai, chống sốc tốt.', case_type_image_url: 'https://placehold.co/400x400/8B5CF6/ffffff?text=Glass+Case', phone_model_name: 'iPhone 14 Pro', quantity: 200
};

export const MOCK_PRODUCTS_LIST = [
    { id: 'inv1', phone_model_id: 'pm1', case_type_id: 'ct1', case_type_name: 'Ốp lưng dẻo iPhone 14 Pro', case_type_price: 299000, case_type_description: 'Ốp lưng làm từ chất liệu TPU dẻo dai, chống sốc tốt.', case_type_image_url: 'https://placehold.co/400x400/8B5CF6/ffffff?text=Glass+Case', phone_model_name: 'iPhone 14 Pro', quantity: 200},
    { id: 'inv2', phone_model_id: 'pm1', case_type_id: 'ct2', case_type_name: 'Ốp lưng cứng iPhone 14 Pro', case_type_price: 109000, case_type_description: 'Ốp lưng làm từ chất liệu TPU dẻo dai, chống sốc tốt.', case_type_image_url: 'https://placehold.co/400x400/8B5CF6/ffffff?text=Glass+Case', phone_model_name: 'iPhone 14 Pro', quantity: 150},
    { id: 'inv3', phone_model_id: 'pm2', case_type_id: 'ct3', case_type_name: 'Ốp lưng dẻo Galaxy S23 Ultra', case_type_price: 99000, case_type_description: 'Ốp lưng làm từ chất liệu TPU dẻo dai, chống sốc tốt.', case_type_image_url: 'https://placehold.co/400x400/8B5CF6/ffffff?text=Glass+Case', phone_model_name: 'Galaxy S23 Ultra', quantity: 180},
    { id: 'inv4', phone_model_id: 'pm2', case_type_id: 'ct4', case_type_name: 'Ốp lưng cứng Galaxy S23 Ultra', case_type_price: 399000, case_type_description: 'Ốp lưng làm từ chất liệu TPU dẻo dai, chống sốc tốt.', case_type_image_url: 'https://placehold.co/400x400/8B5CF6/ffffff?text=Glass+Case', phone_model_name: 'Galaxy S23 Ultra', quantity: 220},
    { id: 'inv5', phone_model_id: 'pm3', case_type_id: 'ct5', case_type_name: 'Ốp lưng dẻo Pixel 7 Pro', case_type_price: 293000, case_type_description: 'Ốp lưng làm từ chất liệu TPU dẻo dai, chống sốc tốt.', case_type_image_url: 'https://placehold.co/400x400/8B5CF6/ffffff?text=Glass+Case', phone_model_name: 'Pixel 7 Pro', quantity: 160},
    { id: 'inv6', phone_model_id: 'pm3', case_type_id: 'ct6', case_type_name: 'Ốp lưng cứng Pixel 7 Pro', case_type_price: 267000, case_type_description: 'Ốp lưng làm từ chất liệu TPU dẻo dai, chống sốc tốt.', case_type_image_url: 'https://placehold.co/400x400/8B5CF6/ffffff?text=Glass+Case', phone_model_name: 'Pixel 7 Pro', quantity: 140},
];




