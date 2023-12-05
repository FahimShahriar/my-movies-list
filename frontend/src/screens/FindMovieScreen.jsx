import Hero from "../components/Hero";
import { MovieBox } from "../components/MovieBox";
import { useSearchMoviesQuery } from "../slices/movieApiSlice";
import { Col, Row, Card, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

const FindMovieScreen = () => {
  const { search } = useParams();
  const [page, SetPage] = useState(1);
  // const [numPages, SetNumPages] = useState(1);
  const [pageMovies, SetPageMovies] = useState([]);

  const {
    data: movies,
    error,
    isLoading,
  } = useSearchMoviesQuery({
    search: search,
    page: 1,
    limit: 8,
  });

  useEffect(() => {
    if (movies) {
      // SetPage(1);
      SetPageMovies(movies.slice(0, 12));
      console.log(movies);
    }
  }, [movies]);

  const handlePageChange = (p) => {
    // SetPage(p);
    // if (movies)
    // console.log(p);
    // SetPageMovies(movies.slice((page - 1) * 8, page * 8));
  };

  return (
    <>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>
          <Loader />
        </>
      ) : pageMovies ? (
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
                {'Search Results for "' + search + '"'}
              </Card.Header>
              <Card.Body
                style={{
                  background: "#999999",
                  color: "black",
                }}
              >
                <>
                  <Row className="">
                    {pageMovies.map((movie) => (
                      <Col
                        key={movie?._id}
                        sm={12}
                        md={12}
                        lg={6}
                        xl={6}
                        xxl={4}
                      >
                        <MovieBox movie={movie} />
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
              ></Card.Body>
            </Card>

            <div
              style={{
                float: "right",
                // position: "relative",
                left: "44%",
                textAlign: "center",
                borderRadius: "20px 20px 20px 20px",
                position: "relative",
                margin: "1ch 0ch 0ch",
                color: "black",
              }}
            >
              <Pagination
                className="px-4"
                // style={{
                //   position: "relative",
                //   float: "left",
                //   left: "-10%",
                // }}
              >
                {Array.from(Array(Math.ceil(movies.length / 12)).keys())
                  .slice(0, 3)
                  .map((_, index) => {
                    return (
                      <Pagination.Item
                        onClick={(e) => {
                          SetPage(index + 1);
                          SetPageMovies(
                            movies.slice(index * 12, (index + 1) * 12)
                          );
                          window.scrollTo(0, 0);
                        }}
                        key={index + 1}
                        active={index + 1 === page}
                      >
                        {index + 1}
                      </Pagination.Item>
                    );
                  })}
              </Pagination>
            </div>
          </Card>
        </>
      ) : null}
    </>
  );
};
export default FindMovieScreen;
