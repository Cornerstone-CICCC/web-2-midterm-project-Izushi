import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './Header.css';
import axios from 'axios';

interface Genre {
  id: number;
  name: string;
}
interface HeaderProps {
  onSearchResults: (movies: []) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchResults }) => {
  const [query, setQuery] = useState<string>('');
  const [genres, setGenres] = useState<Genre[]>([])
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const apiKey = "0a8d1904066c27fb5552becee7441627";
  const movieGenreEndPoint = `https://api.themoviedb.org/3/genre/movie/list?language=en`;
  const searchTrendingEndPoint = `https://api.themoviedb.org/3/search/multi?include_adult=false`;

  const fetchGenreData = () => {
    axios
      .get(`${movieGenreEndPoint}&api_key=${apiKey}`)
      .then((res) => {
        const results = res.data.genres;
        setGenres(results);
        setShowDropdown(true);
      })
      .catch(err => console.error(err));
  };

  const fetchSearchedData = () => {
    axios
      .get(`${searchTrendingEndPoint}&query=${query}&api_key=${apiKey}`)
      .then((res) => {
        const results = res.data.results;
        onSearchResults(results);
      })
      .catch(err => console.error(err));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  return (
    <header className="header-container">
      <h1 className="header-title">Movie App</h1>
      <div className='genre' onClick={fetchGenreData}>
        <h3>Genre</h3>
        {showDropdown && (
          <select>
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
        )}
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder='Search Movies'
          className="search-input"
          value={query}
          onChange={handleInputChange}
        />
        <button onClick={fetchSearchedData} className='search-button'>Search</button>
      </div>
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
      </nav>
    </header>
  )
};

export default Header;