import React from "react";
import SlideButton from "./SlideButton";

import classes from "./index.module.css";

const Heading = (props) => {
  return (
    <div className={classes.container}>
      <div className={props.isMobile ? classes.titleMobile : classes.title}>
        {props.title}
      </div>

      <div
        className={
          props.isMobile ? classes.controller_mobile : classes.controller
        }
      >
        <div>
          <a href=".">See all</a>
        </div>

        {!props.isMobile && (
          <div className={classes.slideBtn}>
            <SlideButton
              direction="prev"
              prev={props.navigationPrevious}
              disabled={props.disablePrevButton}
            />
            <SlideButton
              direction="next"
              next={props.navigationNext}
              disabled={props.disableNextButton}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Heading;
