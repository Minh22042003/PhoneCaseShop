export const createDesign = async (designData, token) => {
    const response = await fetch('/api/designs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(designData),
    });

    if (!response.ok) {
        throw new Error('Failed to create design');
    }

    return response.json();
};

export const getDesigns = async (userId, token) => {
    const response = await fetch(`/api/designs?userId=${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch designs');
    }

    return response.json();
};
