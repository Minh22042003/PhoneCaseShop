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

// Admin-specific: update a user by id (admin sends token + target user id)
export const updateAdminUser = async (userId, userData, token) => {
  const response = await axios.put(`http://localhost:8081/admin/users/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Admin-specific: create a new user
export const createAdminUser = async (userData, token) => {
  const response = await axios.post(`http://localhost:8081/admin/users`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Admin-specific: delete a user by id
export const deleteAdminUser = async (userId, token) => {
  const response = await axios.delete(`http://localhost:8081/admin/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
  const response = await axios.get('http://localhost:8082/casetype', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getAdminInventory = async (token) => {
  const response = await axios.get('http://localhost:8082/inventory', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getRoles = async (token) => {
  const response = await axios.get('http://localhost:8081/admin/roles', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// Product (CaseType) Management
export const createAdminProduct = async (productData, token) => {
  const response = await axios.post(`http://localhost:8082/admin/casetype`, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateAdminProduct = async (productId, productData, token) => {
  const response = await axios.put(`http://localhost:8082/admin/casetype/${productId}`, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteAdminProduct = async (productId, token) => {
  const response = await axios.delete(`http://localhost:8082/admin/casetype/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Phone Model Management
export const getAdminPhoneModels = async (token) => {
  const response = await axios.get('http://localhost:8082/phonemodel', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const createAdminPhoneModel = async (phoneModelData, token) => {
  const response = await axios.post(`http://localhost:8082/admin/phonemodel`, phoneModelData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateAdminPhoneModel = async (phoneModelId, phoneModelData, token) => {
  const response = await axios.put(`http://localhost:8082/admin/phonemodel/${phoneModelId}`, phoneModelData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteAdminPhoneModel = async (phoneModelId, token) => {
  const response = await axios.delete(`http://localhost:8082/admin/phonemodel/${phoneModelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Inventory Management - CRUD functions
export const createAdminInventory = async (inventoryData, token) => {
  const response = await axios.post(`http://localhost:8082/admin/inventory`, inventoryData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateAdminInventory = async (inventoryId, inventoryData, token) => {
  const response = await axios.put(`http://localhost:8082/admin/inventory/${inventoryId}`, inventoryData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteAdminInventory = async (inventoryId, token) => {
  const response = await axios.delete(`http://localhost:8082/admin/inventory/${inventoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};