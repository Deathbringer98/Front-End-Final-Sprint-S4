import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import MovieList from './MovieList';

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { id: 1, title: 'Inception', genre: 'Sci-Fi', year: 2010 },
      { id: 2, title: 'Interstellar', genre: 'Sci-Fi', year: 2014 },
    ]),
  })
);

describe('MovieList Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders the MovieList component', () => {
    render(<MovieList />);
    expect(screen.getByText('Movie List')).toBeInTheDocument();
  });

  test('fetches and displays movies', async () => {
    render(<MovieList />);

    // Wait for the movies to be fetched and rendered
    const movieItems = await screen.findAllByRole('listitem');
    
    expect(movieItems.length).toBe(2);
    expect(movieItems[0]).toHaveTextContent('Inception');
    expect(movieItems[0]).toHaveTextContent('Sci-Fi');
    expect(movieItems[0]).toHaveTextContent('2010');
    expect(movieItems[1]).toHaveTextContent('Interstellar');
    expect(movieItems[1]).toHaveTextContent('Sci-Fi');
    expect(movieItems[1]).toHaveTextContent('2014');
  });

  test('handles empty movie list gracefully', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve([]) }));
    
    render(<MovieList />);

    // Wait for the empty list to be fetched and handled
    const movieItems = await screen.findAllByRole('listitem');
    
    expect(movieItems.length).toBe(0);
    expect(screen.getByText('No movies found')).toBeInTheDocument();
  });

  test('handles fetch errors gracefully', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('Failed to fetch')));

    render(<MovieList />);

    // Wait for the fetch to fail and the error to be logged
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(screen.getByText('Error fetching movies')).toBeInTheDocument();
  });
});
