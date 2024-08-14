import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { AuthContext } from './context/AuthContext'; // Assuming you use an AuthContext to manage authentication

// Mock the AuthContext
const mockAuthContextValue = {
  isAuthenticated: true,
};

describe('App Component', () => {

  test('renders the login page for "/login" route', () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test('renders the register page for "/register" route', () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <MemoryRouter initialEntries={['/register']}>
          <App />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText(/register/i)).toBeInTheDocument();
  });

  test('renders the MovieList component for "/" route when authenticated', () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText(/movies/i)).toBeInTheDocument();
  });

  test('renders the CreateMovie component for "/movies/create" route when authenticated', () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <MemoryRouter initialEntries={['/movies/create']}>
          <App />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText(/add movie/i)).toBeInTheDocument();
  });

  test('renders the EditMovie component for "/movies/:id/edit" route when authenticated', () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <MemoryRouter initialEntries={['/movies/1/edit']}>
          <App />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText(/edit movie/i)).toBeInTheDocument();
  });

  test('renders the MovieDetail component for "/movies/:id" route when authenticated', () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <MemoryRouter initialEntries={['/movies/1']}>
          <App />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText(/details/i)).toBeInTheDocument(); // Adjust based on your actual component
  });

  test('renders the Search component for "/search" route when authenticated', () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <MemoryRouter initialEntries={['/search']}>
          <App />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByPlaceholderText(/search for a movie/i)).toBeInTheDocument();
  });

  test('redirects to login if not authenticated', () => {
    render(
      <AuthContext.Provider value={{ isAuthenticated: false }}>
        <MemoryRouter initialEntries={['/movies']}>
          <App />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

});