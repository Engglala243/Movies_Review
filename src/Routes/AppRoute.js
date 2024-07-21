import React from 'react'
import { 
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import Home from '../Pages/Home';
import TvShows from '../Pages/Tvshow';
import Movies from '../Pages/Movies';

function AppRoute() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tvshows" element={<TvShows />} />
            <Route path="/movies" element={<Movies />} />
        </Routes>
    </Router>
  )
}

export default AppRoute
