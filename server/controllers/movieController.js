import Movie from "../models/movieModel.js";
import Review from "../models/reviewModel.js";

export const getMovies = async (req, res) => {
  try {
    const movie = await Movie.find();
    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMovieByTmdbID = async (req, res) => {
  try {
    console.log("====================================");
    const movie = await Movie.findOne({ tmdb_id: req.query.tmdb_id });

    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMovieByID = async (req, res) => {
  try {
    console.log(req.query._id);
    const movie = await Movie.findOne({ _id: req.query._id });

    const reviews = await Review.find({
      tmdb_id: movie.tmdb_id,
    }).sort({
      total: -1,
      helpful: -1,
      tmdb_id: -1,
    });
    // .limit(3);

    if (req.query.username) {
      const userReview = await Review.findOne({
        tmdb_id: movie.tmdb_id,
        username: req.query.username,
      });
      res.status(200).json({ ...movie._doc, reviews, userReview });
    } else {
      res.status(200).json({ ...movie._doc, reviews });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const findMovie = async (req, res) => {
  try {
    const { page, limit, search } = req.query;
    console.log(req.query);

    const movie = await Movie.find({
      name: { $regex: "^" + search, $options: "i" },
    }); //TODO: Add Pagination
    // .limit(limit)
    // .skip((page - 1) * limit);

    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPopularMovies = async (req, res) => {
  try {
    const { page, limit } = req.query;
    console.log(req.query);

    const movie = await Movie.find()
      .sort({ popularity: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTopMovies = async (req, res) => {
  try {
    const { page, limit } = req.query;
    console.log(req.query);

    const movie = await Movie.find()
      .sort({
        rating: -1,
        num_raters: -1,
        popularity: -1,
      })
      .limit(limit)
      .skip((page - 1) * limit);

    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
