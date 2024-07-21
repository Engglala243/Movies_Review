import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function MovieModal({ show, handleClose, movie, handleTrailerClick }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{movie.Title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{movie.Plot}</p>
        <p><strong>Rating:</strong> {movie.imdbRating}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleTrailerClick}>Go to Trailer</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MovieModal;
