import express from "express";

import {
  findMovie,
  getMovies,
  getPopularMovies,
  getTopMovies,
  getMovieByID,
  getMovieByTmdbID,
} from "../controllers/movieController.js";
import { getReviews } from "../controllers/reviewController.js";

const router = express.Router();

// router.get('/', getMovies);
router.get("/find", findMovie);
router.get("/findByID", getMovieByID);
router.get("/findByTmbdID", getMovieByTmdbID);
router.get("/popular", getPopularMovies);
router.get("/top", getTopMovies);
router.get("/review", getReviews);

// router.patch('/:id', updatePost);

export default router;
