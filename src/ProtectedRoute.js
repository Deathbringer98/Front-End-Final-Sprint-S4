import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from './services/authService';

const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn()) {
        return <Navigate to="/search" />;
    }
    return children;
};

export default ProtectedRoute;
