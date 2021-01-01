import React, { useContext, useState } from "react";
import { Media, Button } from "reactstrap";
import classes from "./MovieCover.module.css";
import "./MovieCover.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { addToWatchlist } from "../../../firebase/firestore/watchlist";
import { AuthContext } from "../../../contexts/auth.context";
interface IMovie {
  movie: any;
}
const MovieCover: React.FC<IMovie> = (props) => {
  const [overlayClass, setOverlayClass] = useState<string>("Overlay");
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);
  return (
    <div
      style={{
        display: "inline-block",
        position: "relative",
        width: "100vw",
        height: "300px",
      }}
      onMouseEnter={() => setOverlayClass("OverlayHovered")}
      onMouseLeave={() => setOverlayClass("Overlay")}>
      <div className={overlayClass}>
        <Media src={props.movie.posterurl} className={classes.Media} />
      </div>
      <Button className={classes.BackButton} onClick={() => history.goBack()}>
        <FontAwesomeIcon style={{ fontSize: "20px" }} icon={faArrowLeft} />
      </Button>
      <Button
        className={classes.AddButton}
        onClick={() => addToWatchlist(props.movie, currentUser.uid)}>
        Add to Watchlist
      </Button>
      <h6 className={classes.Title} style={{ bottom: "10%" }}>
        {props.movie.title}
      </h6>
    </div>
  );
};
export default MovieCover;
