import React, { useEffect, useState } from 'react';
import { fetchNewAndPopular, fetchMovieDetails } from '../Services/Api';
import NewMovieModal from '../Components/NewMovieModal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from '../Components/Navbar';
import './NewPopular.css';

function NewPopular() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [year, setYear] = useState(2024);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getMovies = async () => {
      const movies = await fetchNewAndPopular(year, currentPage);
      setMovies(movies);
    };
    getMovies();
  }, [year, currentPage]);

  const handleCardClick = async (movieID) => {
    const movie = await fetchMovieDetails(movieID);
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleYearChange = (e) => {
    setYear(e.target.value);
    setCurrentPage(1); // Reset to first page on year change
  };

  const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <>
      <Navbar />
      <div className="new-popular-page">
        <Container className="mt-4">
          <h1 className="text-light">New & Popular {year} Releases</h1>
          <Form.Group controlId="yearSelect" className="year-select">
            <Form.Label className="text-light">Select Year</Form.Label>
            <Form.Control as="select" value={year} onChange={handleYearChange}>
              {[...Array(10)].map((_, i) => {
                const y = 2024 - i;
                return <option key={y} value={y}>{y}</option>;
              })}
            </Form.Control>
          </Form.Group>
          <Row className="mt-3">
            {movies.length > 0 ? (
              movies.map(movie => (
                <Col key={movie.imdbID} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <Card className="bg-dark text-white movie-card" onClick={() => handleCardClick(movie.imdbID)}>
                    <Card.Img variant="top" src={movie.Poster} alt={movie.Title} />
                    <Card.ImgOverlay>
                      <Card.Title>{movie.Title}</Card.Title>
                    </Card.ImgOverlay>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <p className="text-light">No movies available for this year.</p>
              </Col>
            )}
          </Row>
          <div className="d-flex justify-content-between mt-4">
            <Button variant="secondary" onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous Page
            </Button>
            <Button variant="secondary" onClick={handleNextPage}>
              Next Page
            </Button>
          </div>
        </Container>
        {selectedMovie && (
          <NewMovieModal
            show={showModal}
            handleClose={handleClose}
            movie={selectedMovie}
            handleTrailer={() => window.open(`https://www.youtube.com/results?search_query=${selectedMovie.Title}+trailer`, '_blank')}
          />
        )}
      </div>
    </>
  );
}

export default NewPopular;
