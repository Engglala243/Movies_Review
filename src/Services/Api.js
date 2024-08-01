import axios from 'axios';

const API_KEY = 'c848f0d8';
const BASE_URL = 'https://www.omdbapi.com';

const fetchMovies = async (year) => {
  const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=movie&y=${year}`);
  return response.data.Search;
};

const fetchTvShows = async (year) => {
  const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=series&y=${year}`);
  return response.data.Search.filter(show => show.Type === 'series' || show.Type === 'tvSeries');
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

const fetchNewAndPopular = async (year, page) => {
  try {
    const response = await axios.get(`${BASE_URL}?s=movie&type=movie&y=${year}&apikey=${API_KEY}&page=${page}`);
    // const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=series&y=${year}`);
    return response.data.Search || []; 
  } catch (error) {
    console.error('Error fetching new and popular items:', error);
    return [];
  }
};

const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};
  
export { fetchNewAndPopular, fetchBestReviewedMovies, fetchMovies, fetchTvShows, fetchMovieDetails };