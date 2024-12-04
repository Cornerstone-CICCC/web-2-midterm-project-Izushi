import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './Header.css';
import axios from 'axios';

interface HeaderProps {
  onSearchResults: (movies: []) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchResults }) => {
  const [query, setQuery] = useState<string>('');

  const apiKey = "0a8d1904066c27fb5552becee7441627";
  const searchTrendingEndPoint = `https://api.themoviedb.org/3/search/multi?include_adult=false`;


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