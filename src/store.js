import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import movieReducer from './reducers/movieReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    movies: movieReducer,
});

const store = createStore(rootReducer);

export default store;
