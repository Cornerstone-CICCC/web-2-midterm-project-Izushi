import axios from 'axios';
import React, { useState } from 'react'
import StarIcon from '@mui/icons-material/Star';
import Modal from '../../components/Modal/Modal';
import './Home.css'

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
            <div className='vote-average'>
              <StarIcon
                style={{ color: movie.vote_average >= 7 ? 'yellow' : '#ccc', fontSize: '70px' }}
              ></StarIcon>
              <p>{typeof movie.vote_average === 'number' ? (movie.vote_average === 10 ? '10' : movie.vote_average.toFixed(1)) : 'N/A'}</p>
            </div>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <div className="movie-info">
              <h3>{movie.title}</h3>
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