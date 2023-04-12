import React from "react";

import classes from "./slideButton.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const SlideButton = (props) => {
  return (
    <div>
      <button
        style={{ visibility: props.visible }}
        onClick={props.next ? () => props.next() : () => props.prev()}
        className={
          props.direction === "next"
            ? [classes.btnSlide, classes.next].join(" ")
            : [classes.btnSlide, classes.prev].join(" ")
        }
        disabled={props.disabled}
      >
        {props.direction === "next" ? (
          <FontAwesomeIcon icon={faArrowRight} size="lg" />
        ) : (
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
        )}
      </button>
    </div>
  );
};

export default SlideButton;
