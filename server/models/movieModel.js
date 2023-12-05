import mongoose from 'mongoose';

const movieSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        movie_rated: {
            type: String,
            required: true,
        },
        run_length: {
            type: String,
            required: true,
        },
        genres: {
            type: String,
            required: true,
        },
        release_date: {
            type: String,
            required: true,
        },
        rating: {
            type: Number ,
            required: true,
        },
        num_raters: {
            type: Number ,
            required: true,
        },
        popularity: {
            type: Number ,
        },
        tmdb_id: {
            type: Number ,
        },
        poster_path: {
            type: String,
        },
        backdrop_path: {
            type: String,
        },
        overview: {
            type: String,
        }
    },
);


movieSchema.index({ name: 'text' });

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;