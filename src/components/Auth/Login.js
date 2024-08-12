import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import './Auth.css';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset the error state
        try {
            const response = await login(credentials);
            console.log('Login response:', response); // Verify the response
            if (response && response.token) {
                console.log('Login successful, redirecting to /search');
                navigate('/search');
            } else {
                setError('Invalid login credentials. Please try again.');
                console.error('Login did not return a valid token.');
            }
        } catch (error) {
            setError('An error occurred during login. Please try again later.');
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Username" 
                    value={credentials.username}
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={credentials.password}
                    onChange={handleChange} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Login;
