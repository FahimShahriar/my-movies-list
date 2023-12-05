import { apiSlice } from "./apiSlice";
const MOVIE_URL = "/api/movies";

export const movieApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    popularMovies: builder.query({
      query: (data) => ({
        url: `${MOVIE_URL}/popular?page=${data.page}&limit=${data.limit}`,
        method: "GET",
      }),
    }),
    topMovies: builder.query({
      query: (data) => ({
        url: `${MOVIE_URL}/top?page=${data.page}&limit=${data.limit}`,
        method: "GET",
      }),
    }),
    searchMovies: builder.query({
      query: (data) => ({
        url: `${MOVIE_URL}/find?search=${data.search}&page=${data.page}&limit=${data.limit}`,
        method: "GET",
      }),
    }),
    getReviews: builder.query({
      query: (data) => ({
        url: `${MOVIE_URL}/review?tmdb_id=${data.tmdb_id}`,
        method: "GET",
      }),
    }),
    getMovieByID: builder.query({
      query: (data) => ({
        url: `${MOVIE_URL}/findByID?_id=${data._id}&username=${data.username}`,
        method: "GET",
      }),
    }),
    getMovieByTmdbID: builder.query({
      query: (data) => ({
        url: `${MOVIE_URL}/findByTmbdID?tmdb_id=${data.tmdb_id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  usePopularMoviesQuery,
  useTopMoviesQuery,
  useSearchMoviesQuery,
  useGetReviewsQuery,
  useGetMovieByIDQuery,
  useGetMovieByTmdbIDQuery,
} = movieApiSlice;
