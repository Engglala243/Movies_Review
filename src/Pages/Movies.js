import React, { useEffect, useState } from 'react';
import { fetchBestReviewedMovies, fetchMovieDetails } from '../Services/Api';
import MovieModal from '../Components/MovieModal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import './Movies.css';
import Navbar from '../Components/Navbar';

function Movies() {
  document.title = 'Movies Review - Movies';
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 
  const [likedMovies, setLikedMovies] = useState([]);
  const [year, setYear] = useState('2024');

  useEffect(() => {
    const getMovies = async () => {
      const { movies, totalPages } = await fetchBestReviewedMovies(currentPage, year); 
      setMovies(movies);
      setTotalPages(totalPages);
    };
    getMovies();
  }, [currentPage, year]);

  const handleCardClick = async (movieID) => {
    const movie = await fetchMovieDetails(movieID);
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleLike = (movie) => {
    if (!likedMovies.find(m => m.imdbID === movie.imdbID)) {
      setLikedMovies([...likedMovies, movie]);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
    setCurrentPage(1); 
  };

  return (
    <>
      <Navbar />
      <div className="movies-page">
        <Container className="mt-4">
          <h1 className="text-light">Best Reviewed Movies of {year}</h1>
          <Form.Group controlId="yearSelect" className="year-select-form-group">
        <Form.Label className="year-select-label">Select Year</Form.Label>
        <Form.Control as="select" value={year} onChange={handleYearChange} className="year-select-control">
          {[...Array(10)].map((_, i) => {
            const y = 2024 - i;
            return <option key={y} value={y}>{y}</option>;
          })}
        </Form.Control>
      </Form.Group>
          <Row className="mt-3">
            {movies.map(movie => (
              <Col key={movie.imdbID} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card className="bg-dark text-white movie-card">
                  <Card.Img 
                    variant="top" 
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=Poster+Not+Available'} 
                    alt={movie.Title} 
                    onClick={() => handleCardClick(movie.imdbID)}
                  />
                  <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Button variant="outline-info" onClick={() => handleLike(movie)}>Like</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination>
            <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1} />
            <Pagination.Item active>{currentPage}</Pagination.Item>
            <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages} />
          </Pagination>
        </Container>
        {selectedMovie && (
          <MovieModal 
            show={showModal} 
            handleClose={handleClose} 
            movie={selectedMovie} 
            handleTrailerClick={() => window.open(`https://www.youtube.com/results?search_query=${selectedMovie.Title}+trailer`, '_blank')}
          />
        )}
      </div>
    </>
  );
}

export default Movies;
