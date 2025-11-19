import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../api/userApi';

// Custom Hook sử dụng TanStack Query
export const useUser = (userId) => {
  return useQuery({
    // Khóa duy nhất để Query quản lý cache
    queryKey: ['user', userId], 
    // Hàm gọi API thực
    queryFn: () => fetchUser(userId), 
    // Tùy chọn: Dữ liệu được cache trong 5 phút
    staleTime: 1000 * 60 * 5, 
  });
};