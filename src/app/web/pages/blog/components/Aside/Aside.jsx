import React from "react";

import classes from "./Aside.module.css";
import Widget from "./Widget/Widget";
import LatestPost from "./LatestPost/LatestPost";
import Categories from "./Categories/Categories";

const Aside = (props) => {
  return (
    <div className={classes.container}>
      <Widget title="Latest Post">
        <LatestPost blogs={props.blogs} />
      </Widget>
    </div>
  );
};

export default Aside;
