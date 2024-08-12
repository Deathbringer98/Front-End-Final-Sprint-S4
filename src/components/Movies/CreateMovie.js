import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMovie } from '../../services/movieService';
import './CreateMovie.css';

const CreateMovie = () => {
    const [movie, setMovie] = useState({ title: '', director: '', releaseYear: '' });
    const [notification, setNotification] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie({ ...movie, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createMovie(movie);
            setNotification('Movie created successfully!');
            setTimeout(() => {
                setNotification('');
                navigate('/'); // Navigate back to the search page after a short delay
            }, 2000); // Show notification for 2 seconds before navigating
        } catch (error) {
            console.error('Error creating movie', error);
            setNotification('Failed to create movie. Please try again.');
        }
    };

    const handleBackToSearch = () => {
        navigate('/');
    };

    return (
        <div className="create-movie-container">
            <h2>Create Movie</h2>
            {notification && <p className="notification">{notification}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" value={movie.title} onChange={handleChange} required />
                <input type="text" name="director" placeholder="Director" value={movie.director} onChange={handleChange} required />
                <input type="text" name="releaseYear" placeholder="Release Year" value={movie.releaseYear} onChange={handleChange} required />
                <div className="button-group">
                    <button type="submit" className="create-button">Create</button>
                    <button type="button" className="back-button" onClick={handleBackToSearch}>Back to Search</button>
                </div>
            </form>
        </div>
    );
};

export default CreateMovie;
