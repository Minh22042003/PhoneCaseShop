import axios from 'axios';

export const getCart = async (userId, token) => {
    const response = await axios.get('/api/cart', {
        params: { userId },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
