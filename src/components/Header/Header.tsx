import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './Header.css';
import axios from 'axios';

interface Genre {
  id: number;
  name: string;
}

interface HeaderProps {
  onSearchQuery: (query: string) => void;
  onGenre: (genre: Genre | null) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchQuery, onGenre }) => {
  const [query, setQuery] = useState<string>('');
  const [genres, setGenres] = useState<Genre[]>([]);

  const apiKey = "0a8d1904066c27fb5552becee7441627";
  const movieGenreEndPoint = `https://api.themoviedb.org/3/genre/movie/list?language=en`;

  const fetchGenreData = () => {
    axios
      .get(`${movieGenreEndPoint}&api_key=${apiKey}`)
      .then((res) => {
        const results = res.data.genres;
        setGenres(results);
      })
      .catch(err => console.error(err));
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genreId = Number(e.target.value);
    const genreName = e.target.options[e.target.selectedIndex].dataset.name ?? '';
    onGenre({ id: genreId, name: genreName });
    setQuery('');
    onSearchQuery('');
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  const handleSubmit = () => {
    onSearchQuery(query);
    onGenre(null);
  }

  return (
    <header className="header-container">
      <div className="title-genre-container">
        <h1 className="header-title">Movie App</h1>
          <select className='genre' onClick={fetchGenreData} onChange={handleGenreChange}>
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id ?? ''} data-name={genre.name}>{genre.name}</option>
            ))}
          </select>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder='Search Movies'
          className="search-input"
          value={query}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit} className='search-button'>Search</button>
      </div>
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
      </nav>
    </header>
  )
};

export default Header;