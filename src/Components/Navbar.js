import React, { useState } from 'react';
import { Navbar, Nav, Form, Button, Modal, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Navigation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [likedMovies, setLikedMovies] = useState({});

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?s=${searchQuery}&apikey=c848f0d8`);
        setSearchResults(response.data.Search || []);
        setShowModal(true);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  };

  const handleClose = () => setShowModal(false);

  const handleCardClick = async (movieId) => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=c848f0d8`);
      const movieData = response.data;
      const trailerUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(movieData.Title + " trailer")}`;
      setSelectedMovie({ ...movieData, Trailer: trailerUrl });
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handleLikeToggle = (movieId) => {
    setLikedMovies(prev => ({
      ...prev,
      [movieId]: !prev[movieId]
    }));
  };

  return (
    <>
      <Navbar className='navbar fixed-top navbar-expand-lg navbar-dark bg-dark'>
        <div className="container-fluid">
          <Navbar.Brand as={Link} to="/"><img src="/android-icon-36x36.png" alt="MR" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/tvshows">TV Shows</Nav.Link>
              <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
              <Nav.Link as={Link} to="/newpopular">New & Popular</Nav.Link>
              <Nav.Link as={Link} to="/mylist">My List</Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={handleSearchSubmit}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Button variant="outline-info" type="submit">Search</Button>
            </Form>
          </Navbar.Collapse>
        </div>
      </Navbar>
      {/* ===================(NAV MOVIE MODAL)=================== */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Search Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {searchResults.length > 0 ? (
            <Row className="justify-content-center">
              {searchResults.map((result) => (
                <Col key={result.imdbID} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex justify-content-center">
                  <Card className="search-result-card" onClick={() => handleCardClick(result.imdbID)}>
                    <Card.Img variant="top" src={result.Poster !== 'N/A' ? result.Poster : 'https://via.placeholder.com/300x450?text=No+Image+Available'} />
                    <Card.Body>
                      <Card.Title>{result.Title}</Card.Title>
                      <Card.Text>
                        <strong>Type:</strong> {result.Type}
                      </Card.Text>
                      <Card.Text>
                        <strong>Year:</strong> {result.Year}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p>No results found.</p>
          )}
        </Modal.Body>
      </Modal>

      {selectedMovie && (
        <Modal show={Boolean(selectedMovie)} onHide={() => setSelectedMovie(null)} size="sm" centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedMovie.Title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={selectedMovie.Poster} alt={selectedMovie.Title} style={{ width: '100%' }} />
            <p>{selectedMovie.Plot}</p>
            <p><strong>Released:</strong> {selectedMovie.Released}</p>
            <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
            <p><strong>IMDB Rating:</strong> {selectedMovie.imdbRating}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant={likedMovies[selectedMovie.imdbID] ? "danger" : "outline-danger"} 
              onClick={() => handleLikeToggle(selectedMovie.imdbID)}
            >
              {likedMovies[selectedMovie.imdbID] ? "Unlike" : "Like"}
            </Button>
            {selectedMovie.Trailer && (
              <Button 
                variant="info" 
                onClick={() => window.open(selectedMovie.Trailer, '_blank')}
              >
                Watch Trailer
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default Navigation;
