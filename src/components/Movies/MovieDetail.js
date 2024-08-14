import React, { useEffect, useState } from 'react';
import { getMovieById } from '../../services/movieService';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const { data } = await getMovieById(id);
                setMovie(data);
            } catch (error) {
                console.error('Error fetching movie', error);
                setError('Failed to fetch movie details. Please try again later.');
            }
        };
        fetchMovie();
    }, [id]);

    if (error) return <div>{error}</div>;
    if (!movie) return <div>Loading...</div>;

    return (
        <div>
            <h2>{movie.title}</h2>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Release Year:</strong> {movie.releaseYear}</p>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Main Actor:</strong> {movie.mainActor}</p>
            <p><strong>Rating:</strong> {movie.rating}</p>
            <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
        </div>
    );
};

export default MovieDetail;
