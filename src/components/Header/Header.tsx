import React from 'react';
import { Link } from 'react-router-dom'
import './Header.css';

interface HeaderProps {
  query: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const Header: React.FC<HeaderProps> = ({ query, onInputChange, onSearch }) => {
  return (
    <header className="header-container">
      <h1 className="header-title">Movie App</h1>
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
      </nav>
      <div className="search-bar">
        <input
          type="text"
          placeholder='Search Movies'
          className="search-input"
          value={query}
          onChange={onInputChange}
        />
        <button onClick={onSearch} className='search-button'>Search</button>
      </div>
    </header>
  )
};

export default Header;