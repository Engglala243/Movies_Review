import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, Button, Modal, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

function Navigation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [likedMovies, setLikedMovies] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      try {
        const response = await axios.get(`https://www.omdbapi.com?s=${searchQuery}&apikey=c848f0d8`);
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
      const response = await axios.get(`https://www.omdbapi.com?i=${movieId}&apikey=c848f0d8`);
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`custom-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-brand" onClick={closeMenu}>
            <img src="/android-icon-36x36.png" alt="MR" />
          </Link>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <Nav className="nav-links">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/tvshows">TV Shows</Nav.Link>
              <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
              <Nav.Link as={Link} to="/newpopular">New & Popular</Nav.Link>
              <Nav.Link as={Link} to="/mylist">My List</Nav.Link>
            </Nav>
            
            {/* Desktop Search */}
            <Form className="desktop-search" onSubmit={handleSearchSubmit}>
              <Form.Control
                type="search"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Button variant="outline-info" type="submit">
                <i className="fas fa-search"></i>
              </Button>
            </Form>
          </div>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}></div>
        
        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-header">
            <Link to="/" className="mobile-brand" onClick={closeMenu}>
              <img src="/android-icon-36x36.png" alt="MR" />
              <span>Movie Reviews</span>
            </Link>
            <button className="close-btn" onClick={closeMenu}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="mobile-nav-links">
            <Link to="/" onClick={closeMenu}>Home</Link>
            <Link to="/tvshows" onClick={closeMenu}>TV Shows</Link>
            <Link to="/movies" onClick={closeMenu}>Movies</Link>
            <Link to="/newpopular" onClick={closeMenu}>New & Popular</Link>
            <Link to="/mylist" onClick={closeMenu}>My List</Link>
          </div>
        </div>
      </nav>

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
