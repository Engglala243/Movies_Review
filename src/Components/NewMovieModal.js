import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function NewMovieModal({ show, handleClose, movie, handleTrailer }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{movie.Title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="movie-details">
          {/* <img src={movie.Poster} alt={movie.Title} className="modal-poster"/> */}
          <div className="modal-info">
            <p><strong>Year:</strong> {movie.Year}</p>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleTrailer}>
          Watch Trailer
        </Button>
        <Button variant="outline-primary" onClick={() => console.log('Like button clicked')}>
          Like
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewMovieModal;
