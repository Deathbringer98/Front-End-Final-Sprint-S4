// movieReducer.js
import {
    FETCH_MOVIES_SUCCESS,
    FETCH_MOVIE_SUCCESS,
    CREATE_MOVIE_SUCCESS,
    UPDATE_MOVIE_SUCCESS,
    DELETE_MOVIE_SUCCESS
} from './actionTypes';

const initialState = {
    movies: [],
    currentMovie: null,
};

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MOVIES_SUCCESS:
            return { ...state, movies: action.payload };
        case FETCH_MOVIE_SUCCESS:
            return { ...state, currentMovie: action.payload };
        case CREATE_MOVIE_SUCCESS:
            return { ...state, movies: [...state.movies, action.payload] };
        case UPDATE_MOVIE_SUCCESS:
            return {
                ...state,
                movies: state.movies.map(movie => 
                    movie.id === action.payload.id ? action.payload : movie),
            };
        case DELETE_MOVIE_SUCCESS:
            return {
                ...state,
                movies: state.movies.filter(movie => movie.id !== action.payload.id),
            };
        default:
            return state;
    }
};

export default movieReducer;
