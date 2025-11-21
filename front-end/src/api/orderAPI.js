import axios from 'axios';

export const createOrder = async (orderData) => {
    const response = await axios.post('/api/orders', orderData);
    return response.data;
};

export const getOrders = async (userId) => {
    const response = await axios.get('/api/orders', { params: { userId } });
    return response.data;
};

export const getOrderById = async (orderId) => {
    const response = await axios.get(`/api/orders/${orderId}`);
    return response.data;
};
