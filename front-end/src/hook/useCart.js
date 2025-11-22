import { useQuery } from '@tanstack/react-query';
import { getCart } from '../api/cartAPI';
import { useAuth } from '../context/AuthContext';

export const useCart = () => {
    const { auth } = useAuth();
    const userId = auth?.user?.id;

    const { data, isLoading, error } = useQuery({
        queryKey: ['cart', userId],
        queryFn: () => getCart(userId, auth?.token),
        enabled: !!userId && !!auth?.token, // Only fetch if userId and token exist
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return { cartItems: data, isLoading, error };
};
