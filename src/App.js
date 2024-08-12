import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Header from './components/Header';
import CreateMovie from './components/Movies/CreateMovie';
import EditMovie from './components/Movies/EditMovie';
import MovieDetail from './components/Movies/MovieDetail';
import MovieList from './components/Movies/MovieList';
import Search from './components/Search'; // Import the Search component
import ProtectedRoute from './ProtectedRoute';

function App() {
    return (
        <Router>
            <Header />
            <div className="container">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route 
                        path="/" 
                        element={
                            <ProtectedRoute>
                                <MovieList />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/movies/create" 
                        element={
                            <ProtectedRoute>
                                <CreateMovie />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/movies/:id/edit" 
                        element={
                            <ProtectedRoute>
                                <EditMovie />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/movies/:id" 
                        element={
                            <ProtectedRoute>
                                <MovieDetail />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/search" 
                        element={
                            <ProtectedRoute>
                                <Search />
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
