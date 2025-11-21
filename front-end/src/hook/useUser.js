import { useMutation, useQuery } from '@tanstack/react-query';
import { login, adminLogin, getUserById, updateUser } from '../api/userApi';

// Hook login sử dụng mutation
export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useAdminLogin = () => {
  return useMutation({
    mutationFn: adminLogin,
  });
};

export const useGetUserById = () => {
  return useMutation({
    mutationFn: getUserById,
  });
};

export const useUserDetails = (userId) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: ({ userId, userData }) => updateUser(userId, userData),
  });
};