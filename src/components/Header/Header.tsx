import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './Header.css';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';

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
  const [isGenreOpen, setIsGenreOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const apiKey = "0a8d1904066c27fb5552becee7441627";
  const movieGenreEndPoint = `https://api.themoviedb.org/3/genre/movie/list?language=en`;

  useEffect(() => {
    fetchGenreData()
  }, []);

  const fetchGenreData = () => {
    axios
      .get(`${movieGenreEndPoint}&api_key=${apiKey}`)
      .then((res) => {
        const results = res.data.genres;
        setGenres(results);
      })
      .catch(err => console.error(err));
  };

  const handleGenreClick = (genre: Genre) => {
    onGenre(genre);
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

  const toggleGenre = () => {
    setIsGenreOpen(!isGenreOpen);
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className="header-container">
      <div className="title-container">
        <div className="menu-icon" onClick={toggleMenu}>
          <MenuIcon style={{ fontSize: 50 }} />
        </div>
        <h1 className="header-title">Movie App</h1>
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
      {isMenuOpen && (
        <div className="side-menu">
          <button className="close-menu" onClick={toggleMenu}>×</button>
          <nav>
            <Link to="/" className="side-menu-link" onClick={toggleMenu}>Home</Link>
            <Link to="/about" className="side-menu-link" onClick={toggleMenu}>About</Link>
          </nav>
          <hr />

          <div className="genre-list">
            <h2 onClick={toggleGenre}>Genre</h2>
            {isGenreOpen && genres.map((genre) => {
              return(
              <div
                className="genre-item"
                key={genre.id}
                onClick={() => handleGenreClick(genre)}
              >
                {genre.name}
              </div>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
};

export default Header;