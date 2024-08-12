import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, logout } from '../services/authService';
import './Header.css'; // Ensure to import your CSS file

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <ul>
                {isLoggedIn() ? (
                    <>
               {/* <li><Link to="/movies/create" className="button-link">Add Movie</Link></li> */}

                        <li><button onClick={handleLogout} className="button-link">Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login" className="button-link">Login</Link></li>
                        <li><Link to="/register" className="button-link">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Header;
