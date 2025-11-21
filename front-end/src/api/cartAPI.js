import axios from 'axios';

export const getCart = async (userId) => {
    const response = await axios.get('/api/cart', { params: { userId } });
    return response.data;
};
