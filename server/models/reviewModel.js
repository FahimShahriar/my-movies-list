import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    title: String,
    review: String,
    username: String,
    rating: Number,
    tmdb_id: {
        type: Number,
    },
    total: Number,
    helpful: Number,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    last_updated: {
        type: Date,
        default: Date.now,
    },
});


const Review = mongoose.model("Review", reviewSchema);

export default Review;