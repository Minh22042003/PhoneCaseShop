import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createOrder, getOrders, getOrderById } from '../api/orderAPI';
import { useAuth } from '../context/AuthContext';

export const useCreateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createOrder,
        onSuccess: () => {
            queryClient.invalidateQueries(['orders']);
            queryClient.invalidateQueries(['cart']); // Assuming cart is cleared after order
        },
    });
};

export const useOrders = () => {
    const { auth } = useAuth();
    const userId = auth?.user?.id;

    const { data, isLoading, error } = useQuery({
        queryKey: ['orders', userId],
        queryFn: () => getOrders(userId),
        enabled: !!userId,
    });

    return { orders: data, isLoading, error };
};

export const useOrder = (orderId) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['order', orderId],
        queryFn: () => getOrderById(orderId),
        enabled: !!orderId,
    });

    return { order: data, isLoading, error };
};
