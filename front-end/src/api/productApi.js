import axios from 'axios';

// Hàm gọi API thực (sẽ bị MSW chặn trong môi trường dev)
export const fetchAllProduct = async () => {
  const response = await axios.get(`/api/products/all`);
  return response.data; // Trả về dữ liệu thô
};