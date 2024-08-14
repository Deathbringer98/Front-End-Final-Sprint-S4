import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Search from './Search';

// Mock the fetch API globally for this test file
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      {
        id: 1,
        title: 'Inception',
        director: 'Christopher Nolan',
        genre: 'Sci-Fi',
        release_year: 2010,
        description: 'A mind-bending thriller.'
      },
      {
        id: 2,
        title: 'Hell House',
        director: 'Unknown',
        genre: '', // Empty genre to simulate edge case
        release_year: 2003,
        description: 'A documentary.'
      },
      {
        id: 3,
        title: 'Double Or Nothing',
        director: 'Unknown',
        genre: '(no genres listed)', // Missing genre information
        release_year: 2001,
        description: 'A drama with an unknown genre.'
      }
    ])
  })
);

describe('Search Component', () => {

  beforeEach(() => {
    // Clear the fetch mock before each test to ensure clean state
    fetch.mockClear();
  });

  test('renders the Search component', () => {
    render(<Search />);
    expect(screen.getByPlaceholderText(/Search for a movie/i)).toBeInTheDocument();
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
  });

  test('updates the query state on input change', () => {
    render(<Search />);
    const inputElement = screen.getByPlaceholderText(/Search for a movie/i);

    fireEvent.change(inputElement, { target: { value: 'Inception' } });
    expect(inputElement.value).toBe('Inception');
  });

  test('fetches movies and displays them on successful search', async () => {
    render(<Search />);
    const inputElement = screen.getByPlaceholderText(/Search for a movie/i);
    const buttonElement = screen.getByText(/Search/i);

    fireEvent.change(inputElement, { target: { value: 'Inception' } });
    fireEvent.click(buttonElement);

    // Wait for the fetch to be called and for the UI to update
    const movieTitle = await screen.findByText('Inception');
    expect(movieTitle).toBeInTheDocument();
    expect(screen.getByText(/Christopher Nolan/i)).toBeInTheDocument();
    expect(screen.getByText(/Sci-Fi/i)).toBeInTheDocument();
    expect(screen.getByText(/2010/i)).toBeInTheDocument();
    expect(screen.getByText(/A mind-bending thriller/i)).toBeInTheDocument();
  });

  test('handles movies with missing or empty genre', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          {
            id: 2,
            title: 'Hell House',
            director: 'Unknown',
            genre: '', // Empty genre
            release_year: 2003,
            description: 'A documentary.'
          }
        ])
      })
    );

    render(<Search />);
    const inputElement = screen.getByPlaceholderText(/Search for a movie/i);
    const buttonElement = screen.getByText(/Search/i);

    fireEvent.change(inputElement, { target: { value: 'Hell House' } });
    fireEvent.click(buttonElement);

    const movieTitle = await screen.findByText('Hell House');
    expect(movieTitle).toBeInTheDocument();
    expect(screen.getByText(/A documentary/i)).toBeInTheDocument();
    // Expect genre to be handled as missing, update this to match your component's output
    expect(screen.getByText(/No genres listed/i)).toBeInTheDocument();
  });

  test('displays an error message if the search fails', async () => {
    // Override fetch to simulate a failed request
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Failed to fetch movies'))
    );

    render(<Search />);
    const inputElement = screen.getByPlaceholderText(/Search for a movie/i);
    const buttonElement = screen.getByText(/Search/i);

    fireEvent.change(inputElement, { target: { value: 'Unknown' } });
    fireEvent.click(buttonElement);

    const errorMessage = await screen.findByText('Failed to fetch movies. Please try again later.');
    expect(errorMessage).toBeInTheDocument();
    expect(screen.queryByText(/No movies found/i)).not.toBeInTheDocument();
  });

  test('displays "No movies found" if no movies match the query', async () => {
    // Override fetch to simulate no movies found
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([])
      })
    );

    render(<Search />);
    const inputElement = screen.getByPlaceholderText(/Search for a movie/i);
    const buttonElement = screen.getByText(/Search/i);

    fireEvent.change(inputElement, { target: { value: 'Unknown' } });
    fireEvent.click(buttonElement);

    const noMoviesMessage = await screen.findByText('No movies found for "Unknown"');
    expect(noMoviesMessage).toBeInTheDocument();
  });
});