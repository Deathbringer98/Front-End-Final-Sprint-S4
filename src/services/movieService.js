import axios from 'axios';

const API_URL = 'http://localhost:8080/api/movies';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    if (!token) {
        throw new Error('No authentication token found');
    }
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const getMovies = async () => {
    try {
        const response = await axios.get(API_URL, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error.response?.data || error.message;
    }
};

export const getMovieById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(`Error fetching movie with ID ${id}:`, error);
        throw error.response?.data || error.message;
    }
};

export const createMovie = async (movie) => {
    try {
        const response = await axios.post(API_URL, movie, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error('Error creating movie:', error);
        throw error.response?.data || error.message;
    }
};

export const updateMovie = async (id, movie) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, movie, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(`Error updating movie with ID ${id}:`, error);
        throw error.response?.data || error.message;
    }
};

export const deleteMovie = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error(`Error deleting movie with ID ${id}:`, error);
        throw error.response?.data || error.message;
    }
};
