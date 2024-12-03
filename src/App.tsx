import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import './App.css';

interface Movies {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
}

const App:React.FC = () => {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [query, setQuery] = useState<string>('');

  const apiKey = "0a8d1904066c27fb5552becee7441627";
  const trendingEndPoint = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&include_adult=false`;
  const searchTrendingEndPoint = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&include_adult=false&query=`;

  useEffect(() => {
    fetchData(trendingEndPoint);
  }, []);


  const fetchData = (endPoint: string, query: string = '') => {
    axios
      .get(endPoint + query)
      .then((res) => {
        const result = res.data.results;
        console.log(result);
        setMovies(result);
      })
      .catch(err => console.error(err));
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  const handleSearch = () => {
    fetchData(searchTrendingEndPoint, query);
  }

  return (
    <BrowserRouter>
      <Header query={query} onInputChange={handleInputChange} onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home movies={movies} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
