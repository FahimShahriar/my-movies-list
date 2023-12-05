import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import {
  useAddFriendMutation,
  useDeleteFriendMutation,
  useGetOtherUserProfileQuery,
} from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import { MovieBox } from "../components/MovieBox";
import { SmallMovieBox } from "../components/SmallMovieBox";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addFriend, deleteFriend, setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const IMAGE_UNAVAILABLE_PLACEHOLDER =
  "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";
const IMAGE_LINK = "https://image.tmdb.org/t/p/w500";

const OtherUserProfileScreen = () => {
  const { username } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addFriend, { addFriendIsLoading }] = useAddFriendMutation();
  const [deleteFriend, { deleteFriendIsLoading }] = useDeleteFriendMutation();

  useEffect(() => {
    if (userInfo && userInfo.name === username) {
      navigate("/profile");
    }
  }, [navigate, userInfo, username]);

  const {
    data: user,
    error,
    isLoading,
  } = useGetOtherUserProfileQuery({ username });

  const friendHandler = async (e) => {
    e.preventDefault();
    try {
      if (!userInfo.friends.find((f) => f._id == user._id)) {
        const res = await addFriend({
          _id: user._id,
        }).unwrap();
        console.log(res);
        dispatch(setCredentials(res));
        toast.success("Friend Added");
      } else {
        const res = await deleteFriend({
          _id: user._id,
        }).unwrap();
        console.log(res);
        dispatch(setCredentials(res));
        toast.success("Friend Removed");
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

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
                      {user?.name + "'s Profile"}
                      <Button
                        variant="outline-primary"
                        style={{ float: "right" }}
                        onClick={friendHandler}
                      >
                        {
                          userInfo
                            ? userInfo.friends.find((f) => f._id == user._id)
                              ? "Remove Friend"
                              : "Add Friend"
                            : null
                          //   ? user?.friends?.includes(userInfo._id)
                          //     ? "Remove Friend"
                          //     : "Add Friend"
                          //   : null
                        }
                      </Button>
                    </Card.Header>
                    <Card.Body
                      style={{
                        background: "#999999",
                        color: "black",
                      }}
                    >
                      <Card.Title style={{ fontSize: 30 }}>
                        Top Movies
                        {/* <div style={{ fontSize: 20, color: "gray" }}>
                      {"title2"}
                    </div> */}
                      </Card.Title>
                      <>
                        <Row className="">
                          {user.reviews.map((review) => (
                            <Col
                              key={review?._id}
                              sm={12}
                              md={12}
                              lg={6}
                              xl={6}
                              xxl={4}
                            >
                              <MovieBox movie={null} tmdb_id={review.tmdb_id} />
                            </Col>
                          ))}
                        </Row>
                      </>
                      {/* <Card.Text>{"text"}</Card.Text> */}
                      {/* <Button variant="primary">Go somewhere</Button> */}
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
                </Col>
              </Row>
            </Container>
          </Card>
        </>
      ) : null}
    </>
  );
};

export default OtherUserProfileScreen;
