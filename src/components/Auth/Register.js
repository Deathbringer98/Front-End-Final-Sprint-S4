import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';
import './Auth.css';

const Register = () => {
    const [userData, setUserData] = useState({ username: '', password: '', email: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset the error state
        console.log('Submitting:', userData); // Check if form data is captured
        try {
            const response = await register(userData);
            console.log('Registration response:', response); // Check response from the server
            navigate('/login');
        } catch (error) {
            setError('Registration failed. Please try again later.');
            console.error('Registration failed', error);
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Username" 
                    value={userData.username}
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={userData.password}
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={userData.email}
                    onChange={handleChange} 
                    required 
                />
                <button type="submit">Register</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Register;
