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

export const MovieBox = ({ movie, tmdb_id, review }) => {
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
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 40,
            }}
          >
            <Card
              style={{
                width: "100%",
                background: "#161616",
                color: "white",
                borderRadius: 6,
                position: "relative",
                cursor: "pointer",
              }}
              className=" movie-card"
              onClick={() => navigate(`/movie/${movie._id}`)}
            >
              <Card.Body>
                <LazyLoadImage
                  src={
                    !movie?.poster_path || !movie?.backdrop_path
                      ? IMAGE_UNAVAILABLE_PLACEHOLDER
                      : `${IMAGE_LINK}${movie.poster_path}`
                  }
                  width={"100%"}
                  height={400}
                  alt="movie"
                  effect="blur"
                  style={{ objectFit: "cover" }}
                />
                <Card.Title className="text-center mt-3">
                  {movie?.name || movie?.title}
                </Card.Title>
              </Card.Body>
            </Card>
          </motion.div>
        </>
      ) : null}
    </>
  );
};
