import { useMutation } from '@tanstack/react-query';
import { login } from '../api/userApi';

// Hook login sử dụng mutation
export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};