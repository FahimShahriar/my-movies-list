/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useGetMovieByTmdbIDQuery } from "../slices/movieApiSlice";
import Loader from "./Loader";

const IMAGE_UNAVAILABLE_PLACEHOLDER =
  "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";
const IMAGE_LINK = "https://image.tmdb.org/t/p/w500";

export const SmallMovieBox = ({ movie, tmdb_id, review }) => {
  const navigate = useNavigate();
  console.log(movie);
  console.log(tmdb_id);
  console.log("====================================");
  let skip = false;
  if (movie) {
    console.log("skip");
    skip = true;
  }

  const { data, error, isLoading } = useGetMovieByTmdbIDQuery(
    {
      tmdb_id: tmdb_id,
    },
    { skip: skip }
  );

  if (!skip) {
    movie = data;
  }

  return (
    <>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>
          <Loader />
        </>
      ) : movie ? (
        <>
          <Card style={{ width: "100%" }}>
            <Card.Img
              variant="top"
              src={
                !movie?.poster_path || !movie?.backdrop_path
                  ? IMAGE_UNAVAILABLE_PLACEHOLDER
                  : `${IMAGE_LINK}${movie.poster_path}`
              }
              onClick={() => navigate(`/movie/${movie._id}`)}
            />
            <Card.Body>
              <Card.Title>{movie?.name || movie?.title}</Card.Title>
              <Card.Text>{review}</Card.Text>
            </Card.Body>
          </Card>
        </>
      ) : null}
    </>
  );
};
