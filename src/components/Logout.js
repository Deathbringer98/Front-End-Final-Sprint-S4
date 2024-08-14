import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import './Logout.css';
const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <h2>You have been logged out.</h2>
            <button onClick={handleLogout}>Login Again</button>
        </div>
    );
};

export default Logout;
