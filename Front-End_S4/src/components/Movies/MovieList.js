import React, { useEffect, useState } from 'react';
import { getMovies } from '../../services/movieService';
import { Link } from 'react-router-dom';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const { data } = await getMovies();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies', error);
                setError('Failed to fetch movies. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Movies</h2>
            {movies.length === 0 ? (
                <p>No movies available.</p>
            ) : (
                <ul>
                    {movies.map(movie => (
                        <li key={movie.id}>
                            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MovieList;
