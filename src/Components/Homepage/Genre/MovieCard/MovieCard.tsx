import React, { useState } from "react";
import { Media } from "reactstrap";
import classes from "./MovieCard.module.css";
import "./MovieCard.css";
import { useHistory } from "react-router-dom";
interface IMovie {
  title: string;
  storyline: string;
  url: string;
}
const MovieCard: React.FC<IMovie> = (props) => {
  const [show, setShow] = useState<boolean>(false);
  const [overlayClass, setOverlayClass] = useState<string>("OverlayCard");
  const history = useHistory();

  const handleMouseEnter = () => {
    setOverlayClass("OverlayHoveredCard");
    setShow(true);
  };

  const handleMouseLeave = () => {
    setOverlayClass("OverlayCard");
    setShow(false);
  };

  return (
    <div
      style={{
        display: "inline-block",
        position: "relative",
        margin: "10px",
        borderRadius: "15px",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className={overlayClass}>
        <Media
          src={props.url}
          className={classes.Media}
          onClick={() =>
            history.push({
              pathname: `/movies/${props.title}`,
            })
          }
        />
      </div>
      <h6
        className={classes.Title}
        style={{ bottom: show ? "27%" : "10%", cursor: "pointer" }}>
        {props.title}
      </h6>
      <h6
        className={classes.Description}
        style={{
          display: show ? "block" : "none",
          cursor: "pointer",
        }}>
        {props.storyline}
      </h6>
    </div>
  );
};
export default MovieCard;
