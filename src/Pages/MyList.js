import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import './MyList.css';



let MyList = () => {
  document.title = 'Movies Review - MyList';
  let [movies, setMovies] = useState([]);
  let [selectedMovie, setSelectedMovie] = useState(null);
  let [showModal, setShowModal] = useState(false);
  let [watchlist, setWatchlist] = useState([]);
  let [searchQuery, setSearchQuery] = useState('');
  let [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    let fetchMovies = async () => {
      try {
        let response = await axios.get(`http://www.omdbapi.com?s=movie&apikey=c848f0d8`);
        if (response.data.Response === "True") {
          setMovies(response.data.Search || []);
        } else {
          console.error('Error fetching movies:', response.data.Error);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  let handleCardClick = async (movieId) => {
    try {
      let response = await axios.get(`http://www.omdbapi.com?i=${movieId}&apikey=c848f0d8`);
      if (response.data.Response === "True") {
        let movieData = response.data;
        setSelectedMovie(movieData);
        setShowModal(true);
      } else {
        console.error('Error fetching movie details:', response.data.Error);
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  let handleClose = () => setShowModal(false);

  let handleLikeToggle = (movieID) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.imdbID === movieID ? { ...movie, liked: !movie.liked } : movie
      )
    );
  };

  let handleWatchlistToggle = (movieID) => {
    setWatchlist((prevWatchlist) =>
      prevWatchlist.includes(movieID)
        ? prevWatchlist.filter(id => id !== movieID)
        : [...prevWatchlist, movieID]
    );
  };

  let handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  let handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      try {
        let response = await axios.get(`http://www.omdbapi.com?s=${searchQuery}&apikey=c848f0d8`);
        if (response.data.Response === "True") {
          setSearchResults(response.data.Search || []);
        } else {
          console.error('Error fetching search results:', response.data.Error);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="my-list-page">
        <Container className="mt-4">
          <h1 className="text-light">My List</h1>
          <Form onSubmit={handleSearchSubmit} className="form-container mb-4">
            <Form.Control
              type="search"
              placeholder="Search Movies"
              value={searchQuery}
              onChange={handleSearchChange}
              className="form-control"
            />
            <Button variant="outline-info" type="submit" className="btn mt-2">
              Search
            </Button>
          </Form>
          <Row>
            {searchQuery ? (
              searchResults.length > 0 ? (
                searchResults.map(movie => (
                  <Col key={movie.imdbID} xs={12} sm={6} md={4} lg={3} className="mb-4">
                    <Card className="bg-dark text-white movie-card" onClick={() => handleCardClick(movie.imdbID)}>
                      <Card.Img variant="top" src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image+Available'} alt={movie.Title} />
                      <Card.ImgOverlay>
                        <Card.Title>{movie.Title}</Card.Title>
                      </Card.ImgOverlay>
                    </Card>
                  </Col>
                ))
              ) : (
                <p className="text-light">No search results found.</p>
              )
            ) : (
              movies.length > 0 ? (
                movies.map(movie => (
                  <Col key={movie.imdbID} xs={12} sm={6} md={4} lg={3} className="mb-4">
                    <Card className="bg-dark text-white movie-card" onClick={() => handleCardClick(movie.imdbID)}>
                      <Card.Img variant="top" src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image+Available'} alt={movie.Title} />
                      <Card.ImgOverlay>
                        <Card.Title>{movie.Title}</Card.Title>
                      </Card.ImgOverlay>
                    </Card>
                  </Col>
                ))
              ) : (
                <p className="text-light">No movies available.</p>
              )
            )}
          </Row>
        </Container>
        {selectedMovie && (
          <Modal show={showModal} onHide={handleClose} size="lg" centered>
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
                variant={selectedMovie.liked ? "danger" : "outline-danger"} 
                onClick={() => handleLikeToggle(selectedMovie.imdbID)}
              >
                {selectedMovie.liked ? "Unlike" : "Like"}
              </Button>
              {selectedMovie.Trailer && (
                <Button 
                  variant="info" 
                  onClick={() => window.open(selectedMovie.Trailer, '_blank')}
                >
                  Watch Trailer
                </Button>
              )}
              <Button 
                variant={watchlist.includes(selectedMovie.imdbID) ? "outline-warning" : "warning"} 
                onClick={() => handleWatchlistToggle(selectedMovie.imdbID)}
              >
                {watchlist.includes(selectedMovie.imdbID) ? "Remove from Watchlist" : "Add to Watchlist"}
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </>
  );
};

export default MyList;
