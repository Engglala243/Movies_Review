import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function TvShowModal({ show, handleClose, showDetails }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{showDetails.Title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Year:</strong> {showDetails.Year}</p>
        <p><strong>Genre:</strong> {showDetails.Genre}</p>
        <p><strong>Plot:</strong> {showDetails.Plot}</p>
        <p><strong>Director:</strong> {showDetails.Director}</p>
        <p><strong>Actors:</strong> {showDetails.Actors}</p>
        <p><strong>Rating:</strong> {showDetails.imdbRating}</p>
        <p><strong>Reviews:</strong></p>
        <ul>
          {showDetails.Reviews && showDetails.Reviews.map((review, index) => (
            <li key={index}>{review}</li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TvShowModal;
