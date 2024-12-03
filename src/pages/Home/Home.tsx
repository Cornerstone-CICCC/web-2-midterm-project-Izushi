import React from 'react'

interface Movies {
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
  return (
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
  )
}

export default Home