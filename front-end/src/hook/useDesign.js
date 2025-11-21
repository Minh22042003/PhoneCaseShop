import { useState, useCallback } from 'react';
import { createDesign, getDesigns } from '../api/designApi';

export const useDesign = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [designs, setDesigns] = useState([]);

    const saveDesign = async (designData) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await createDesign(designData);
            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUserDesigns = useCallback(async (userId) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await getDesigns(userId);
            setDesigns(result);
            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { saveDesign, fetchUserDesigns, designs, isLoading, error };
};
