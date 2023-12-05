/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useGetReviewsQuery } from "../slices/movieApiSlice";
import { useGetMovieByIDQuery } from "../slices/movieApiSlice";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const IMAGE_UNAVAILABLE_PLACEHOLDER =
  "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";
const IMAGE_LINK = "https://image.tmdb.org/t/p/w500";

//
const MovieScreen = () => {
  const { _id } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [friendsReviews, setFriendsReviews] = useState([]);

  const {
    data: movie,
    error: movieError,
    isLoading: movieIsLoading,
  } = useGetMovieByIDQuery({
    _id: _id,
    username: userInfo.name,
  });

  useEffect(() => {
    if (movie && userInfo) {
      console.log(movie.reviews);
      setFriendsReviews(
        movie.reviews.filter((r) => {
          if (r.user == "656d365c3704ceec0be687ef") {
            console.log(userInfo.friends._id);
          }
          return userInfo.friends.find((f) => f._id == r.user);
        })
      );
    }
  }, [movie, userInfo]);

  return (
    <>
      {movieError ? (
        <>Oh no, there was an error</>
      ) : movieIsLoading ? (
        <>
          <Loader />
        </>
      ) : movie ? (
        <>
          <Card
            style={{
              width: "100%",
              background: "#222831",
              outlineColor: "#222831",
              outlineStyle: "solid",
              color: "white",
              borderRadius: "40px 0px 40px 0px",
              position: "relative",
              padding: "2% 2% 3%",
            }}
          >
            <Container className="borderRadius">
              <div className="wrapper mt-4">
                <div id="movie-info" className=" d-flex gap-5">
                  <img
                    style={{
                      borderRadius: 5,
                      boxShadow: "#393E46 -1px -1px 57px 1px",
                      width: "30%",
                      height: "45%",
                      objectFit: "cover",
                    }}
                    src={
                      !movie.poster_path || !movie.backdrop_path
                        ? IMAGE_UNAVAILABLE_PLACEHOLDER
                        : `${IMAGE_LINK}${movie.poster_path}`
                    }
                    alt="movie thumnail"
                  />
                  <div className="mt-5">
                    <h3 style={{ fontSize: 34, color: "white" }}>
                      {movie.name}
                    </h3>
                    <p
                      style={{
                        color: "#a5a5a5",
                        marginTop: 15,
                        lineHeight: 1.8,
                      }}
                    >
                      {movie.overview}
                    </p>
                    <p style={{ color: "#a5a5a5", fontWeight: "bold" }}>
                      Release Date: {movie.release_date}
                    </p>
                  </div>
                </div>
              </div>
            </Container>

            {movie.userReview ? (
              <Card
                style={{
                  width: "100%",
                  borderRadius: "20px 20px 20px 20px",
                  position: "relative",
                  margin: "2% 0% 0%",
                  color: "black",
                }}
              >
                <Card.Header style={{ background: "#999999", fontSize: 34 }}>
                  Your Review
                </Card.Header>
                <Card.Body
                  style={{
                    background: "#EEEEEE",
                    color: "black",
                  }}
                >
                  <Card.Title style={{ fontSize: 30 }}>
                    {movie.userReview.title}
                    <Button
                      variant="outline-primary"
                      style={{ float: "right" }}
                      onClick={() => {
                        navigate(`/profile`);
                      }}
                    >
                      {movie.userReview.username + "'s profile"}
                    </Button>

                    <div style={{ fontSize: 20, color: "gray" }}>
                      {"-" +
                        movie.userReview.username +
                        " - (" +
                        movie.userReview.rating +
                        "/10)"}
                    </div>
                  </Card.Title>
                  <Card.Text>{movie.userReview.review}</Card.Text>
                </Card.Body>
              </Card>
            ) : null}
            {/* START */}
            {friendsReviews.length != 0 ? (
              <Card
                style={{
                  width: "100%",
                  borderRadius: "20px 20px 20px 20px",
                  position: "relative",
                  margin: "2% 0% 0%",
                  color: "black",
                }}
              >
                <Card.Header style={{ background: "#999999", fontSize: 34 }}>
                  Friend Reviews
                </Card.Header>
                {friendsReviews.map((review, idx) => (
                  <Card.Body
                    style={{
                      background: idx % 2 ? "#DDDDDD" : "#EEEEEE",
                      color: "black",
                    }}
                    key={review._id}
                  >
                    <Card.Title style={{ fontSize: 30 }}>
                      {review.title}
                      {/* <LinkContainer to={`/findMovie/${search}`}> */}
                      <Button
                        variant="outline-primary"
                        style={{ float: "right" }}
                        onClick={() => {
                          console.log(review.username);
                          navigate(`/profile/${review.username}`);
                        }}
                      >
                        {review.username + "'s profile"}
                      </Button>
                      {/* </LinkContainer> */}
                      <div style={{ fontSize: 20, color: "gray" }}>
                        {"-" +
                          review.username +
                          " - (" +
                          review.rating +
                          "/10)"}
                      </div>
                    </Card.Title>
                    <Card.Text>{review.review}</Card.Text>
                  </Card.Body>
                ))}
              </Card>
            ) : null}
            {/* MID */}
            <Card
              style={{
                width: "100%",
                borderRadius: "20px 20px 20px 20px",
                position: "relative",
                margin: "2% 0% 0%",
                color: "black",
              }}
            >
              <Card.Header style={{ background: "#999999", fontSize: 34 }}>
                Top Reviews
              </Card.Header>
              {movie.reviews.slice(0, 3).map((review, idx) => (
                <Card.Body
                  style={{
                    background: idx % 2 ? "#DDDDDD" : "#EEEEEE",
                    color: "black",
                  }}
                  key={review._id}
                >
                  <Card.Title style={{ fontSize: 30 }}>
                    {review.title}
                    {/* <LinkContainer to={`/findMovie/${search}`}> */}
                    <Button
                      variant="outline-primary"
                      style={{ float: "right" }}
                      onClick={() => {
                        console.log(review.username);
                        navigate(`/profile/${review.username}`);
                      }}
                    >
                      {review.username + "'s profile"}
                    </Button>
                    {/* </LinkContainer> */}
                    <div style={{ fontSize: 20, color: "gray" }}>
                      {"-" + review.username + " - (" + review.rating + "/10)"}
                    </div>
                  </Card.Title>
                  <Card.Text>{review.review}</Card.Text>
                </Card.Body>
              ))}
            </Card>
          </Card>
        </>
      ) : null}
    </>
  );
};

export default MovieScreen;
