import Review from "../models/reviewModel.js";

export const getReviews = async (req, res) => {
  try {
    const { page, limit, tmdb_id } = req.query;

    const review = await Review.find({
      tmdb_id: tmdb_id,
    }).sort({
      total: -1,
      helpful: -1,
      tmdb_id: -1,
    });
    // .limit(limit)
    // .skip((page - 1) * limit);

    res.status(200).json(review);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addReview = async (req, res) => {
  try {
    const { title, review, username, rating, tmdb_id } = req.body;

    const newReview = new Review({
      title,
      review,
      username,
      rating,
      tmdb_id,
      total: 0,
      helpful: 0,
    });

    await newReview.save();

    res.status(200).json(newReview);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
