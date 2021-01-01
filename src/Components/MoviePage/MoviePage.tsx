import React, { useContext, useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { AuthContext } from "../../contexts/auth.context";
import {
  getMovieByTitle,
  getRelatedMovies,
} from "../../firebase/firestore/movies";
import MovieCard from "../Homepage/Genre/MovieCard/MovieCard";
import Loading from "../Shared/Loading/Loading";
import MovieCover from "./MovieCover/MovieCover";

const MoviePage = () => {
  interface ParamTypes {
    id: string;
  }
  const [movie, setMovie] = useState<any>(null);
  const [relatedMovies, setRelatedMovies] = useState<Set<any>>(new Set());
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams<ParamTypes>();
  useEffect(() => {
    if (currentUser) {
      const fetchMovie = () => {
        getMovieByTitle(setMovie, id);
      };

      return fetchMovie();
    }
  }, [id, currentUser]);
  useEffect(() => {
    if (currentUser) {
      const fetchRelatedMovies = () => {
        if (movie) {
          movie.genres.forEach((genre: string) => {
            getRelatedMovies(setRelatedMovies, genre, movie.title);
          });
        }
      };
      setRelatedMovies(new Set());
      return fetchRelatedMovies();
    }
  }, [movie, currentUser]);
  if (!currentUser) return <Redirect to="/signin" />;
  if (!movie) {
    return <Loading />;
  }
  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <MovieCover movie={movie} />
      </Row>
      <Row className="m-0">
        <Col className="p-0">
          <p className="text-left m-3">{movie.storyline}</p>
          <h3 className="text-left mt-4 ml-3">Related Movies</h3>
          {Array.from(relatedMovies).map((movie: any, index: number) => {
            return (
              <MovieCard
                title={movie.title}
                storyline={movie.storyline}
                url={movie.posterurl}
              />
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
