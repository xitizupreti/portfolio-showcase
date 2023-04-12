import React from "react";
import SlideButton from "./SlideButton/SlideButton";
import { Typography } from "antd";

import classes from "./Heading.module.css";

const { Title } = Typography;

const Heading = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <Title level={3}>{props.title}</Title>
      </div>

      <div className={classes.controller}>
        <div>
          <a href=".">
            <Title level={5}>See all</Title>
          </a>
        </div>

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
      </div>
    </div>
  );
};

export default Heading;
