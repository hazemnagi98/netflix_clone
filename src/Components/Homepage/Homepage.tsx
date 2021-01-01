import React, { useContext, useEffect, useState } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { Row, Col, Container } from "reactstrap";
import { AuthContext } from "../../contexts/auth.context";
import { getMovies } from "../../firebase/firestore/movies";
import Loading from "../Shared/Loading/Loading";
import Genre from "./Genre/Genre";
const Homepage: React.FC = () => {
  interface IGenre {
    title: string;
    movies: Array<any>;
  }
  const [movies, setMovies] = useState<Array<any>>([]);
  const [genres, setGenres] = useState<Set<string>>(new Set());
  const [pending, setPending] = useState<boolean>(false);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    if (currentUser) {
      const fetchMovies = () => {
        setMovies([]);
        getMovies(setMovies);
      };
      setPending(true);
      return fetchMovies();
    }
  }, [currentUser]);

  useEffect(() => {
    const genreSet = new Set<string>();
    movies.forEach((movie) => {
      movie.genres.forEach((genre: string) => {
        genreSet.add(genre);
      });
    });
    setGenres(genreSet);
    setPending(false);
  }, [movies]);

  const genreComponents: IGenre[] = [];

  Array.from(genres).map((genre) => {
    const genreMovies = movies.filter(
      (movie) => movie.genres.indexOf(genre) !== -1
    );
    return genreComponents.push({
      movies: genreMovies,
      title: genre,
    });
  });
  if (!currentUser) return <Redirect to="signin" />;
  if (pending) return <Loading />;
  return (
    <Container>
      <Row>
        <Col>
          <Switch>
            <Route exact path="/homepage">
              {genreComponents.map((genre, index) => (
                <Genre key={index} movies={genre.movies} title={genre.title} />
              ))}
            </Route>
          </Switch>
        </Col>
      </Row>
    </Container>
  );
};
export default Homepage;
