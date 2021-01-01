import classes from "./Genre.module.css";
import React from "react";
import MovieCard from "./MovieCard/MovieCard";
import { Link } from "react-router-dom";

interface IGenre {
  movies: Array<any>;
  title: string;
}

const Genre: React.FC<IGenre> = (props) => {
  return (
    <div className="mt-4">
      <Link to={`/genre/${props.title}`} className={classes.NavLink}>
        <h4 className="text-left mb-3">{props.title}</h4>
      </Link>
      <div className={classes.Main}>
        {props.movies.map((movie, index) => {
          return (
            <MovieCard
              key={index}
              title={movie.title}
              storyline={movie.storyline}
              url={movie.posterurl}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Genre;
