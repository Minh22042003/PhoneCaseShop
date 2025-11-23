import axios from 'axios';

// Đăng nhập: trả về { user, token } hoặc throw lỗi
export const login = async ({ email, password }) => {
  const response = await axios.post('http://localhost:8081/login', { email, password });
  return response.data;
};

// Đăng ký: trả về { user, token } hoặc throw lỗi
export const register = async ({ name, email, password }) => {
  const response = await axios.post('http://localhost:8081/register', { name, email, password });
  return response.data;
};

export const adminLogin = async ({ email, password }) => {
  const response = await axios.post('http://localhost:8081/admin/login', { email, password });
  return response.data;
};

export const checkAdminAuth = async (token) => {
  const response = await axios.get('http://localhost:8081/admin/check', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getUserDetails = async (token) => {
  const response = await axios.get(`http://localhost:8081/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const updateUser = async (userId, userData, token) => {
  const response = await axios.put(`http://localhost:8081/update`, userData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getAdminUsers = async (token) => {
  const response = await axios.get('http://localhost:8081/admin/users', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getAdminProducts = async (token) => {
  const response = await axios.get('/api/admin/products', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getAdminInventory = async (token) => {
  const response = await axios.get('/api/admin/inventory', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};