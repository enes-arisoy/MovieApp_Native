import axios from 'axios';
import { TMDB_API_KEY } from '@env';

const apiBaseUrl = 'https://api.themoviedb.org/3';

export const image500 = path =>
  path ? `https://image.tmdb.org/t/p/w500/${path}` : null;
export const image342 = path =>
  path ? `https://image.tmdb.org/t/p/w342/${path}` : null;
export const image185 = path =>
  path ? `https://image.tmdb.org/t/p/w185/${path}` : null;

/**
 * Axios instance
 */
const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 3000,
  params: {
    api_key: TMDB_API_KEY,
  },
});

/**
 * API çağrıları
 */
export const movieApi = {
  // Trending Movies
  getTrendingMovies: async () => {
    const response = await apiClient.get('/trending/movie/day');
    return response.data;
  },

  // Upcoming Movies
  getUpcomingMovies: async () => {
    const response = await apiClient.get('/movie/upcoming');
    return response.data;
  },

  // Top Rated Movies
  getTopRatedMovies: async () => {
    const response = await apiClient.get('/movie/top_rated');
    return response.data;
  },

  // Similar Movies
  getSimilarMovies: async (movieId) => {
    const response = await apiClient.get(`/movie/${movieId}/similar`);
    return response.data;
  },

  // Movie Credits
  getMovieCredits: async (movieId) => {
    const response = await apiClient.get(`/movie/${movieId}/credits`);
    return response.data;
  },

  // Movie Genres
  getGenres: async () => {
    const response = await apiClient.get('/genre/movie/list');
    return response.data;
  },
  
};
