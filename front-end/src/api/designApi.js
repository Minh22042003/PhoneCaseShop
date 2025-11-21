export const createDesign = async (designData) => {
    const response = await fetch('/api/designs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(designData),
    });

    if (!response.ok) {
        throw new Error('Failed to create design');
    }

    return response.json();
};

export const getDesigns = async (userId) => {
    const response = await fetch(`/api/designs?userId=${userId}`);

    if (!response.ok) {
        throw new Error('Failed to fetch designs');
    }

    return response.json();
};
