import axios from 'axios';
import React, { useState } from 'react'
import Modal from '../../components/Modal/Modal';

interface Movies {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
}

interface HomeProps {
  movies: Movies[];
}

const Home: React.FC<HomeProps> = ({ movies }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const aipKey = "0a8d1904066c27fb5552becee7441627";
  const detailEndPoint = "https://api.themoviedb.org/3/movie/";

  const fetchMovieDetails = (id: number) => {
    axios
      .get(`${detailEndPoint}${id}?api_key=${aipKey}`)
      .then((res) => {
        const result = res.data;
        console.log(result);
        setSelectedMovie(result);
        setIsModalOpen(true);
      })
      .catch(err => console.error(err));
  }

  const handleMovieClick = (id: number) => {
    fetchMovieDetails(id);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  }

  return (
    <div className="movies">
      {movies.map((movie) => {
        return (
          <div
            key={movie.id}
            className="movie"
            onClick={() => handleMovieClick(movie.id)}
          >
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <span>{movie.vote_average}</span>
            </div>
          </div>
        )
      })}
      {selectedMovie && (
        <Modal movie={selectedMovie} onClose={closeModal} isOpen={isModalOpen} />
      )}
    </div>
  )
}

export default Home