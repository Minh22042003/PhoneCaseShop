import axios from 'axios';

export const createOrder = async (orderData, token) => {
    const response = await axios.post('/api/orders', orderData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getOrders = async (userId, token) => {
    const response = await axios.get('/api/orders', {
        params: { userId },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getOrderById = async (orderId, token) => {
    const response = await axios.get(`/api/orders/${orderId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
