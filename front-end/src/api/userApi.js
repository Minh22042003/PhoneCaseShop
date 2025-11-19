import axios from 'axios';

// Hàm gọi API thực (sẽ bị MSW chặn trong môi trường dev)
export const fetchUser = async (userId) => {
  const response = await axios.get(`/api/users/${userId}`);
  return response.data; // Trả về dữ liệu thô
};