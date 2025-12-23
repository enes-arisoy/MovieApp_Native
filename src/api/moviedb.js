import { TMDB_API_KEY } from '@env';

const apiKey= import.meta.TMDB_API_KEY
const apiBaseUrl = "https://api.themoviedb.org/3";

export const api = {
  popular: `${apiBaseUrl}/movie/popular?api_key=${apiKey}`,
  trending: `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`,
};
