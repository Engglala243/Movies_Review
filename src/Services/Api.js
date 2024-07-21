import axios from 'axios';

const API_KEY = 'c848f0d8';
const BASE_URL = 'http://www.omdbapi.com/';

const fetchMovies = async (year) => {
  const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=movie&y=${year}`);
  return response.data.Search;
};

const fetchTvShows = async (year) => {
  const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=series&y=${year}`);
  return response.data.Search.filter(show => show.Type === 'series' || show.Type === 'tvSeries');
};

const fetchMovieDetails = async (movieID) => {
  const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${movieID}&plot=full`);
  return response.data;
};

const fetchBestReviewedMovies = async (page, year) => {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        apikey: API_KEY,
        s: 'best',
        type: 'movie',
        y: year,
        page: page,
      },
    });
    return {
      movies: response.data.Search,
      totalPages: Math.ceil(response.data.totalResults / 10)
    };
  };
  

export { fetchBestReviewedMovies, fetchMovies, fetchTvShows, fetchMovieDetails };
