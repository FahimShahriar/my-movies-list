import Hero from "../components/Hero";
import { MovieBox } from "../components/MovieBox";
import {
  usePopularMoviesQuery,
  useTopMoviesQuery,
} from "../slices/movieApiSlice";
import { Col, Row, Card, Button } from "react-bootstrap";
import Loader from "../components/Loader";

const HomeScreen = () => {
  const {
    data: popMovies,
    error: popError,
    isLoading: popIsLoading,
  } = usePopularMoviesQuery({
    page: 1,
    limit: 8,
  });

  const {
    data: topMovies,
    error: topError,
    isLoading: topIsLoading,
  } = useTopMoviesQuery({
    page: 1,
    limit: 8,
  });

  return (
    <>
      <Card className="text-center" bg="dark">
        <Card.Header>
          <div className="d-grid ">
            <Button variant="primary" size="lg" className="topBtn">
              <h1>Popular Movies</h1>
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          {popError ? (
            <>Oh no, there was an error</>
          ) : popIsLoading ? (
            <>
              <Loader />
            </>
          ) : popMovies ? (
            <>
              <Row md={3} xs={1} lg={4} className="">
                {popMovies.map((movie) => (
                  <Col key={movie._id} sm={12} md={6} lg={4} xl={3}>
                    <MovieBox movie={movie} />
                  </Col>
                ))}
              </Row>
            </>
          ) : null}
        </Card.Body>
      </Card>
      <Card className="text-center" bg="dark">
        <Card.Header>
          <div className="d-grid ">
            <Button variant="primary" size="lg" className="topBtn">
              <h1>Top Movies</h1>
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          {topError ? (
            <>Oh no, there was an error</>
          ) : topIsLoading ? (
            <>
              <Loader />
            </>
          ) : topMovies ? (
            <>
              <Row md={3} xs={1} lg={4} className="">
                {topMovies.map((movie) => (
                  <Col key={movie._id} sm={12} md={6} lg={4} xl={3}>
                    <MovieBox movie={movie} />
                  </Col>
                ))}
              </Row>
            </>
          ) : null}
        </Card.Body>
      </Card>
    </>
  );
};
export default HomeScreen;
