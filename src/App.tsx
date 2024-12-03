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
  const [searchResults, setSearchResults] = useState<Movies[]>([])

  const apiKey = "0a8d1904066c27fb5552becee7441627";
  const trendingEndPoint = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&include_adult=false`;

  useEffect(() => {
    fetchData(trendingEndPoint);
  }, []);


  const fetchData = (endPoint: string) => {
    axios
      .get(endPoint)
      .then((res) => {
        const result = res.data.results;
        console.log(result);
        setMovies(result);
      })
      .catch(err => console.error(err));
  }

  const handleSearchResults = (results: Movies[]) => {
    setSearchResults(results);
  }

  return (
    <BrowserRouter>
      <Header onSearchResults={handleSearchResults} />
      <Routes>
        <Route path="/" element={<Home movies={searchResults.length > 0 ? searchResults : movies} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
