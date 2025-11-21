import { useQuery } from '@tanstack/react-query';
import { getCart } from '../api/cartAPI';
import { useAuth } from '../context/AuthContext';

export const useCart = () => {
    const { auth } = useAuth();
    const userId = auth?.user?.id;

    const { data, isLoading, error } = useQuery({
        queryKey: ['cart', userId],
        queryFn: () => getCart(userId),
        enabled: !!userId, // Only fetch if userId exists
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    return { cartItems: data, isLoading, error };
};
