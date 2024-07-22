// NavMovieModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function NavMovieModal({ show, onHide, movie, onLikeToggle }) {
  if (!movie) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{movie.Title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={movie.Poster} alt={movie.Title} style={{ width: '100%' }} />
        <p>{movie.Plot}</p>
        <p>Released: {movie.Released}</p>
        <p>Genre: {movie.Genre}</p>
        <p>IMDB Rating: {movie.imdbRating}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={movie.isLiked ? "danger" : "outline-danger"} onClick={() => onLikeToggle(movie)}>
          {movie.isLiked ? "Unlike" : "Like"}
        </Button>
        {movie.Trailer && (
          <Button variant="info" onClick={() => window.open(movie.Trailer, '_blank')}>
            Watch Trailer
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default NavMovieModal;
