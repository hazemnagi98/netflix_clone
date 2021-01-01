import React from "react";
import { Spinner } from "reactstrap";
import classes from "./Loading.module.css";

const Loading = () => {
  return (
    <Spinner className={classes.Spinner} animation="border" color="primary" />
  );
};

export default Loading;
