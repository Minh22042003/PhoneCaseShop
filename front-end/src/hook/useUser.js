import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { login, register, adminLogin, getUserDetails, updateUser, updateAdminUser, createAdminUser, deleteAdminUser, getRoles, createAdminProduct, updateAdminProduct, deleteAdminProduct, getAdminPhoneModels, createAdminPhoneModel, updateAdminPhoneModel, deleteAdminPhoneModel, createAdminInventory, updateAdminInventory, deleteAdminInventory } from '../api/userApi';

import { useAuth } from '../context/AuthContext';

// Hook login sử dụng mutation
export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

// Hook register sử dụng mutation
export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};

export const useAdminLogin = () => {
  return useMutation({
    mutationFn: adminLogin,
  });
};

// export const useGetUserById = () => {
//   const { auth } = useAuth();
//   return useMutation({
//     mutationFn: (userId) => getUserById(userId, auth?.token),
//   });
// };

export const useUserDetails = (userId) => {
  const { auth } = useAuth();
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserDetails(auth?.token),
    enabled: !!userId && !!auth?.token,
  });
};

export const useUpdateUser = () => {
  const { auth } = useAuth();
  return useMutation({
    mutationFn: ({ userId, userData }) => updateUser(userId, userData, auth?.token),
  });
};

// Admin-specific update hook
export const useUpdateAdminUser = () => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, userData }) => updateAdminUser(userId, userData, auth?.token),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin', 'users']);
    },
  });
};

// Create admin user
export const useCreateAdminUser = () => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userData }) => createAdminUser(userData, auth?.token),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin', 'users']);
    },
  });
};

// Delete admin user
export const useDeleteAdminUser = () => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId) => deleteAdminUser(userId, auth?.token),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin', 'users']);
    },
  });
};

// Get roles (list of available roles)
export const useRoles = () => {
  const { auth } = useAuth();

  return useQuery({
    queryKey: ['admin', 'roles'],
    queryFn: () => getRoles(auth?.token),
    enabled: !!auth?.token,
  });
};

// Product Management Hooks
export const useCreateAdminProduct = () => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productData }) => createAdminProduct(productData, auth?.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
    },
  });
};

export const useUpdateAdminProduct = () => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, productData }) => updateAdminProduct(productId, productData, auth?.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
    },
  });
};

export const useDeleteAdminProduct = () => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) => deleteAdminProduct(productId, auth?.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
    },
  });
};

// Phone Model Management Hooks
export const useAdminPhoneModels = () => {
  const { auth } = useAuth();
  return useQuery({
    queryKey: ['admin', 'phonemodels'],
    queryFn: () => getAdminPhoneModels(auth?.token),
    enabled: !!auth?.token,
  });
};

export const useCreateAdminPhoneModel = () => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ phoneModelData }) => createAdminPhoneModel(phoneModelData, auth?.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'phonemodels'] });
    },
  });
};

export const useUpdateAdminPhoneModel = () => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ phoneModelId, phoneModelData }) => updateAdminPhoneModel(phoneModelId, phoneModelData, auth?.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'phonemodels'] });
    },
  });
};

export const useDeleteAdminPhoneModel = () => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (phoneModelId) => deleteAdminPhoneModel(phoneModelId, auth?.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'phonemodels'] });
    },
  });
};

// Inventory Management Hooks
export const useCreateAdminInventory = () => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ inventoryData }) => createAdminInventory(inventoryData, auth?.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'inventory'] });
    },
  });
};

export const useUpdateAdminInventory = () => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ inventoryId, inventoryData }) => updateAdminInventory(inventoryId, inventoryData, auth?.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'inventory'] });
    },
  });
};

export const useDeleteAdminInventory = () => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inventoryId) => deleteAdminInventory(inventoryId, auth?.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'inventory'] });
    },
  });
};