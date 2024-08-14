import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
const Home = () => {
    return (
        <div>
            <h1>Welcome to MovieApp</h1>
            <nav>
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;
