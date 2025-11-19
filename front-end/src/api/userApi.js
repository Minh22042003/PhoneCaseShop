import axios from 'axios';

// Đăng nhập: trả về { user, token } hoặc throw lỗi
export const login = async ({ email, password }) => {
  const response = await axios.post('/api/login', { email, password });
  return response.data;
};