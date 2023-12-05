import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { useGetUserProfileQuery } from "../slices/usersApiSlice";
import { useGetMovieByIDQuery } from "../slices/movieApiSlice";
import Loader from "../components/Loader";
import { MovieBox } from "../components/MovieBox";
import { SmallMovieBox } from "../components/SmallMovieBox";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const IMAGE_UNAVAILABLE_PLACEHOLDER =
  "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";
const IMAGE_LINK = "https://image.tmdb.org/t/p/w500";

const UserProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  const { data: user, error, isLoading } = useGetUserProfileQuery();
  // useEffect(() => {
  //   if (user) {
  //     console.log(
  //       user.reviews.slice().sort((a, b) => {
  //         if (a.review > b.review) return 1;
  //         else if (b.review > a.review) return -1;
  //         else return 0;
  //       })
  //     );
  //   }
  // }, [user]);

  return (
    <>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>
          <Loader />
        </>
      ) : user ? (
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
            <Container>
              <Row>
                <Col>
                  <Card
                    style={{
                      width: "100%",
                      borderRadius: "20px 20px 20px 20px",
                      position: "relative",
                      margin: "1ch 0ch 0ch",
                      color: "black",
                    }}
                  >
                    <Card.Header
                      style={{
                        background: "#393E46",
                        borderRadius: "20px 20px 0px 0px",
                        fontSize: 34,
                        color: "white",
                      }}
                    >
                      {"My Profile"}
                    </Card.Header>
                    <Card.Body
                      style={{
                        background: "#999999",
                        color: "black",
                      }}
                    >
                      <Card.Title style={{ fontSize: 30 }}>
                        Top Movies
                      </Card.Title>
                      <>
                        <Row className="">
                          {user.reviews
                            .slice()
                            .sort((a, b) => {
                              if (a.review > b.review) return 1;
                              else if (b.review > a.review) return -1;
                              else return 0;
                            })
                            .map((review) => (
                              <Col
                                key={review?._id}
                                sm={12}
                                md={12}
                                lg={6}
                                xl={6}
                                xxl={4}
                              >
                                <MovieBox
                                  movie={null}
                                  tmdb_id={review.tmdb_id}
                                />
                              </Col>
                            ))}
                        </Row>
                      </>
                    </Card.Body>
                    <Card.Body
                      style={{
                        background: "#999999",
                        color: "black",
                      }}
                    >
                      <Card.Title style={{ fontSize: 30 }}>Stats</Card.Title>
                      <Card.Text>
                        {user?.name +
                          " has spent 4h and 32 mins watching movies"}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card
                    style={{
                      width: "100%",
                      borderRadius: "20px 20px 20px 20px",
                      position: "relative",
                      margin: "1ch 0ch 0ch",
                      color: "black",
                    }}
                  >
                    <Card.Header
                      style={{
                        background: "#393E46",
                        borderRadius: "20px 20px 0px 0px",
                        fontSize: 24,
                        color: "white",
                      }}
                    >
                      My Last List Updates
                    </Card.Header>
                    <Card.Body
                      style={{
                        background: "#999999",
                        color: "black",
                      }}
                    >
                      {error ? (
                        <>Oh no, there was an error</>
                      ) : isLoading ? (
                        <>
                          <Loader />
                        </>
                      ) : user ? (
                        <>
                          <Row className="">
                            {user.reviews.map((review) => (
                              <Col key={review.last_updated} sm={12}>
                                <SmallMovieBox
                                  movie={null}
                                  tmdb_id={review.tmdb_id}
                                  review={review.rating + "/10"}
                                />
                              </Col>
                            ))}
                          </Row>
                        </>
                      ) : null}
                    </Card.Body>
                  </Card>
                  <Card
                    style={{
                      width: "100%",
                      borderRadius: "20px 20px 20px 20px",
                      position: "relative",
                      margin: "1ch 0ch 0ch",
                      color: "black",
                    }}
                  >
                    <Card.Header
                      style={{
                        background: "#393E46",
                        borderRadius: "20px 20px 0px 0px",
                        fontSize: 24,
                        color: "white",
                      }}
                    >
                      Recent Friend Updates
                    </Card.Header>
                    <Card.Body
                      style={{
                        background: "#999999",
                        color: "black",
                      }}
                    >
                      {error ? (
                        <>Oh no, there was an error</>
                      ) : isLoading ? (
                        <>
                          <Loader />
                        </>
                      ) : user ? (
                        <>
                          <Row className="">
                            {user.friends_reviews.map((review) => (
                              <Col key={review.friends_reviews} sm={12}>
                                <SmallMovieBox
                                  movie={null}
                                  tmdb_id={review.tmdb_id}
                                  review={
                                    review.rating +
                                    "/10 - by " +
                                    review.username
                                  }
                                />
                              </Col>
                            ))}
                          </Row>
                        </>
                      ) : null}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Card>
        </>
      ) : null}
    </>
  );
};

export default UserProfileScreen;
