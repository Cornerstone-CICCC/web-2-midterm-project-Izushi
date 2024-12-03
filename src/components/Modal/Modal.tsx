import React from 'react';
import './Modal.css';

interface ModalProps {
  movie: any;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ movie, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          className="modal-close"
          onClick={onClose}
        >×</button>
        <h2>{movie.title}</h2>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
        <p>{movie.overview}</p>
        <p>Release Date: {movie.release_date}</p>
        <p>Rating: {movie.vote_average}</p>
      </div>
    </div>
  );
};

export default Modal