import { useQuery } from '@tanstack/react-query';
import { getAdminUsers, getAdminProducts, getAdminInventory } from '../api/userApi';

export const useAdminUsers = () => {
    return useQuery({
        queryKey: ['admin', 'users'],
        queryFn: getAdminUsers,
    });
};

export const useAdminProducts = () => {
    return useQuery({
        queryKey: ['admin', 'products'],
        queryFn: getAdminProducts,
    });
};

export const useAdminInventory = () => {
    return useQuery({
        queryKey: ['admin', 'inventory'],
        queryFn: getAdminInventory,
    });
};
