import { useQuery } from '@tanstack/react-query';
import { getAdminUsers, getAdminProducts, getAdminInventory } from '../api/userApi';
import { useAuth } from '../context/AuthContext';

export const useAdminUsers = () => {
    const { auth } = useAuth();
    return useQuery({
        queryKey: ['admin', 'users'],
        queryFn: () => getAdminUsers(auth?.token),
        enabled: !!auth?.token,
    });
};

export const useAdminProducts = () => {
    const { auth } = useAuth();
    return useQuery({
        queryKey: ['admin', 'products'],
        queryFn: () => getAdminProducts(auth?.token),
        enabled: !!auth?.token,
    });
};

export const useAdminInventory = () => {
    const { auth } = useAuth();
    return useQuery({
        queryKey: ['admin', 'inventory'],
        queryFn: () => getAdminInventory(auth?.token),
        enabled: !!auth?.token,
    });
};
