import React, { useState } from 'react';
import cinemaImage from './img/img1.jpg'; // Ensure the image path is correct
import './Search.css'; // Import the CSS file

const Search = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null); // State to store any errors

    const handleSearch = async () => {
        if (query.length > 0) {
            try {
                const response = await fetch(`http://localhost:8080/api/movies/search?query=${query}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setMovies(data);
                setError(null); // Clear any previous errors
            } catch (error) {
                console.error('Error fetching movies:', error);
                setError('Failed to fetch movies. Please try again later.');
                setMovies([]); // Clear the movies list if an error occurs
            }
        }
    };

    return (
        <div className="search-page">
            <div className="background-container">
                <img src={cinemaImage} alt="Cinema Background" className="background-image" />
                <div className="search-bar-container">
                    <input
                        type="text"
                        placeholder="Search for a movie..."
                        className="search-bar"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button onClick={handleSearch} className="search-button">Search</button>
                </div>
                <div className="search-results">
                    {error && <p className="error-message">{error}</p>}
                    {movies.length > 0 ? (
                        movies.map(movie => (
                            <div key={movie.id} className="movie-item">
                                <h3>{movie.title}</h3>
                                <p><strong>Director:</strong> {movie.director}</p>
                                <p><strong>Genre:</strong> {movie.genre}</p>
                                <p><strong>Release Year:</strong> {movie.release_year}</p>
                                <p>{movie.description}</p>
                            </div>
                        ))
                    ) : (
                        query && !error && <p>No movies found for "{query}"</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
