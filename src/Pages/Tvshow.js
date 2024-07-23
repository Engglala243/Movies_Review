import React, { useEffect, useState } from 'react';
import { fetchTvShows, fetchMovieDetails } from '../Services/Api';
import Navbar from '../Components/Navbar';
import TvShowModal from '../Components/TvShowModal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import './TvShows.css';

const placeholderPoster = 'https://via.placeholder.com/300x450?text=Poster+Not+Available';

function TvShows() {
  document.title = 'Movies Review - Tvshow';
  const [tvShows, setTvShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [year, setYear] = useState(2024);

  useEffect(() => {
    const getTvShows = async () => {
      const shows = await fetchTvShows(year);
      setTvShows(shows);
    };
    getTvShows();
  }, [year]);

  const handleCardClick = async (showID) => {
    const show = await fetchMovieDetails(showID);
    setSelectedShow(show);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  return (
    <>
      <Navbar/>
      <div className="tv-shows-page">
        <Container className="mt-4">
          <h1 className="text-light">Recent {year} TV Shows</h1>
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
            {tvShows.map(show => (
              <Col key={show.imdbID} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card className="bg-dark text-white tv-show-card" onClick={() => handleCardClick(show.imdbID)}>
                  <Card.Img variant="top" src={show.Poster !== 'N/A' ? show.Poster : placeholderPoster} alt={show.Title} />
                  <Card.ImgOverlay>
                    <Card.Title>{show.Title}</Card.Title>
                  </Card.ImgOverlay>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        {selectedShow && (
          <TvShowModal show={showModal} handleClose={handleClose} showDetails={selectedShow} />
        )}
      </div>
    </>
  );
}

export default TvShows;
