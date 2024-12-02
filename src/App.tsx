import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

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

  useEffect(() => {
    fetchData(trendingEndPoint);
  }, []);

  const trendingEndPoint = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&include_adult=false`;
  const searchTrendingEndPoint = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&include_adult=false&query=`;

  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYThkMTkwNDA2NmMyN2ZiNTU1MmJlY2VlNzQ0MTYyNyIsIm5iZiI6MTczMzA5OTUwNy4yMiwic3ViIjoiNjc0Y2ZmZjM1NjJiMDMwYmI1YWRjODE5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.rhxt4yarLLPRA_nySS2tzJSJa6m9kmHECM_TlwEl9rg'
    }
  };

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
    <div className="App">
      <h1>Popular Movies</h1>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search Movies"
          value={query}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="movies">
        {movies.map((movie) => {
          return (
            <div key={movie.id} className="movie">
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <span>{movie.vote_average}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
