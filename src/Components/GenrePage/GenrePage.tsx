import {
  faSortNumericDown,
  faSortNumericUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, useContext, useState, useEffect } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { Container, Row, Col, Input } from "reactstrap";
import { AuthContext } from "../../contexts/auth.context";
import { getGenreMovies } from "../../firebase/firestore/movies";
import MovieCard from "../Homepage/Genre/MovieCard/MovieCard";

const GenrePage: React.FC = () => {
  interface ParamTypes {
    genre: string;
  }
  const [sort, setSort] = useState<string>("asc");
  const [sorted, setSorted] = useState<boolean>(false);
  const [movies, setMovies] = useState<Array<any>>([]);
  const [unfilteredMovies, setUnfilteredMovies] = useState<Array<any>>([]);
  const { currentUser } = useContext(AuthContext);
  const { genre } = useParams<ParamTypes>();

  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      const fetchMovies = () => {
        getGenreMovies(setUnfilteredMovies, genre);
      };
      return fetchMovies();
    }
  }, [genre, currentUser]);

  useEffect(() => {
    setMovies([...unfilteredMovies]);
  }, [unfilteredMovies]);

  const handleSort = () => {
    if (!sorted) setSorted(true);
    if (sort === "desc") {
      setSort("asc");
      setMovies((prev) => [
        ...prev.sort((a: any, b: any) => parseInt(a.year) - parseInt(b.year)),
      ]);
    } else if (sort === "asc") {
      setSort("desc");
      setMovies((prev) => [
        ...prev.sort((a: any, b: any) => parseInt(b.year) - parseInt(a.year)),
      ]);
    }
  };

  const handleSearch = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const search = target.value;
    if (target.value === "") {
      const tempArr = [...unfilteredMovies];
      if (sorted) {
        if (sort === "desc") {
          setMovies((prev) => [
            ...tempArr.sort(
              (a: any, b: any) => parseInt(b.year) - parseInt(a.year)
            ),
          ]);
        } else if (sort === "asc") {
          setMovies((prev) => [
            ...tempArr.sort(
              (a: any, b: any) => parseInt(a.year) - parseInt(b.year)
            ),
          ]);
        }
      } else setMovies([...tempArr]);
    }
    setMovies((prev) => [
      ...prev.filter((movie) => movie.title.toLowerCase().startsWith(search)),
    ]);
  };

  if (!currentUser) return <Redirect to="/signin" />;
  return (
    <Container>
      <Row>
        <Col>
          <div className="mt-4">
            <div className="text-left mb-3">
              <h4 style={{ display: "inline-block", textAlign: "left" }}>
                {genre}
              </h4>
              <div
                style={{
                  display: "inline-block",
                  width: "80%",
                  textAlign: "right",
                }}>
                <Input
                  type="text"
                  style={{
                    display: "inline-block",
                    width: "30%",
                    border: "black 1px solid",
                  }}
                  placeholder="Search"
                  className="mr-3"
                  onChange={handleSearch}
                />
                <div
                  style={{
                    display: "inline-block",
                    textAlign: "right",
                    border: "1px solid black",
                    padding: "6px 12px 6px 12px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={handleSort}>
                  Sort By Year{" "}
                  <FontAwesomeIcon
                    className="ml-2"
                    icon={sort === "desc" ? faSortNumericUp : faSortNumericDown}
                  />
                </div>
              </div>
            </div>
            <div>
              {movies.map((movie, index) => {
                return (
                  <div
                    key={index}
                    onClick={() =>
                      history.push({ pathname: `/movies/${movie.title}` })
                    }
                    style={{ display: "inline-block" }}>
                    <MovieCard
                      title={movie.title}
                      storyline={movie.storyline}
                      url={movie.posterurl}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default GenrePage;
