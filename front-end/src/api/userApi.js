import axios from 'axios';

// Đăng nhập: trả về { user, token } hoặc throw lỗi
export const login = async ({ email, password }) => {
  const response = await axios.post('/api/login', { email, password });
  return response.data;
};

export const adminLogin = async ({ email, password }) => {
  const response = await axios.post('/api/admin/login', { email, password });
  return response.data;
};

export const checkAdminAuth = async (token) => {
  const response = await axios.get('/api/admin/check-auth', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getUserById = async (userId, token) => {
  const response = await axios.get(`/api/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const updateUser = async (userId, userData, token) => {
  const response = await axios.put(`/api/users/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getAdminUsers = async () => {
  const response = await axios.get('/api/admin/users');
  return response.data;
};

export const getAdminProducts = async () => {
  const response = await axios.get('/api/admin/products');
  return response.data;
};

export const getAdminInventory = async () => {
  const response = await axios.get('/api/admin/inventory');
  return response.data;
};