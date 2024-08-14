import React, { useEffect, useState } from 'react';
import { getMovieById, updateMovie } from '../../services/movieService';
import { useParams, useNavigate } from 'react-router-dom';

const EditMovie = () => {
    const [movie, setMovie] = useState({ title: '', director: '', releaseYear: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const { data } = await getMovieById(id);
                setMovie(data);
            } catch (error) {
                console.error('Error fetching movie', error);
            }
        };
        fetchMovie();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie({ ...movie, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateMovie(id, movie);
            navigate(`/movies/${id}`);
        } catch (error) {
            console.error('Error updating movie', error);
        }
    };

    return (
        <div>
            <h2>Edit Movie</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" value={movie.title} onChange={handleChange} />
                <input type="text" name="director" placeholder="Director" value={movie.director} onChange={handleChange} />
                <input type="text" name="releaseYear" placeholder="Release Year" value={movie.releaseYear} onChange={handleChange} />
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default EditMovie;
