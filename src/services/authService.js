import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth'; // Adjust according to your backend

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        console.log('Login response data:', response.data); // Check the structure of the response

        // Assuming the token is returned as a plain string
        if (typeof response.data === 'string') {
            localStorage.setItem('user', JSON.stringify({ token: response.data }));
            return { token: response.data };
        } else if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
            return response.data;
        }

        console.error('Login did not return a valid token.');
        return null;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const register = async (userData) => {
    try {
        return await axios.post(`${API_URL}/register`, userData);
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

export const getCurrentUser = () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log('Current user:', user); // Log the current user data
        return user;
    } catch (error) {
        console.error('Error retrieving user from localStorage:', error);
        return null;
    }
};

export const isLoggedIn = () => {
    const user = getCurrentUser();
    console.log('Is user logged in?', user && user.token); // Log whether the user is logged in
    return user && user.token;
};
