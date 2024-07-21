// import React, { useEffect, useState } from 'react';
// import { fetchMovies, fetchMovieDetails } from '../Services/Api';
// import MovieModel from '../Components/MovieModel';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Card from 'react-bootstrap/Card';
// import './Home.css';
// import Navbar from '../Components/Navbar';


// function Home() {
//   const [movies, setMovies] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const getMovies = async () => {
//       const movies = await fetchMovies();
//       setMovies(movies.filter(movie => movie.Year === '2024'));
//     };
//     getMovies();
//   }, []);

//   const handleCardClick = async (movieID) => {
//     const movie = await fetchMovieDetails(movieID);
//     setSelectedMovie(movie);
//     setShowModal(true);
//   };

//   const handleClose = () => setShowModal(false);

//   return (
//     <>
//       <Navbar/>
//       <div className="home-page">
//         <Container className="mt-4">
//           <h1 className="text-light">Recent 2024 Releases</h1>
//           <Row>
//             {movies.map(movie => (
//               <Col key={movie.imdbID} xs={12} sm={6} md={4} lg={3} className="mb-4">
//                 <Card className="bg-dark text-white" onClick={() => handleCardClick(movie.imdbID)}>
//                   <Card.Img variant="top" src={movie.Poster} alt={movie.Title} />
//                   <Card.ImgOverlay>
//                     <Card.Title>{movie.Title}</Card.Title>
//                   </Card.ImgOverlay>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </Container>
//         {selectedMovie && (
//           <MovieModel show={showModal} handleClose={handleClose} movie={selectedMovie} />
//         )}
//       </div>
//     </>
//   );
// }

// export default Home;

// ===================================================================================================================

import React, { useEffect, useState } from 'react';
import { fetchMovies, fetchMovieDetails } from '../Services/Api';
import MovieModal from '../Components/MovieModel';
import Navbar from '../Components/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import './Home.css';

const placeholderPoster = 'https://via.placeholder.com/300x450?text=Poster+Not+Available';

function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [year, setYear] = useState(2024);

  useEffect(() => {
    const getMovies = async () => {
      const movies = await fetchMovies(year);
      setMovies(movies);
    };
    getMovies();
  }, [year]);

  const handleCardClick = async (movieID) => {
    const movie = await fetchMovieDetails(movieID);
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  return (
    <>
      <Navbar/>
      <div className="home-page">
        <Container className="mt-4">
          <h1 className="text-light">Movies Released in {year}</h1>
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
                <Card className="bg-dark text-white movie-card" onClick={() => handleCardClick(movie.imdbID)}>
                  <Card.Img variant="top" src={movie.Poster !== 'N/A' ? movie.Poster : placeholderPoster} alt={movie.Title} />
                  <Card.ImgOverlay>
                    <Card.Title>{movie.Title}</Card.Title>
                  </Card.ImgOverlay>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        {selectedMovie && (
          <MovieModal show={showModal} handleClose={handleClose} movie={selectedMovie} />
        )}
      </div>
    </>
  );
}

export default Home;
