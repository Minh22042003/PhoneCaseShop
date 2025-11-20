import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserDetails } from '../../hook/useUser';
import './UserDetails.css';

const UserDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: user, isLoading, error } = useUserDetails(id);

    if (isLoading) {
        return <div className="user-details-loading">Loading user details...</div>;
    }

    if (error) {
        return <div className="user-details-error">Error loading user details: {error.message}</div>;
    }

    if (!user) {
        return <div className="user-details-not-found">User not found</div>;
    }

    return (
        <div className="user-details-container">
            <h1 className="user-details-title">User Information</h1>
            <div className="user-details-card">
                <div className="user-details-item">
                    <span className="user-details-label">ID:</span>
                    <span className="user-details-value">{user.id}</span>
                </div>
                <div className="user-details-item">
                    <span className="user-details-label">Name:</span>
                    <span className="user-details-value">{user.name}</span>
                </div>
                <div className="user-details-item">
                    <span className="user-details-label">Email:</span>
                    <span className="user-details-value">{user.email}</span>
                </div>
                <div className="user-details-item">
                    <span className="user-details-label">Phone:</span>
                    <span className="user-details-value">{user.phone || 'N/A'}</span>
                </div>
                <div className="user-details-item">
                    <span className="user-details-label">Address:</span>
                    <span className="user-details-value">{user.address || 'N/A'}</span>
                </div>
            </div>
            <div className="user-details-actions">
                <button
                    className="btn-edit"
                    onClick={() => navigate(`/user/edit/${user.id}`)}
                >
                    Edit User
                </button>
            </div>
        </div>
    );
};

export default UserDetails;
