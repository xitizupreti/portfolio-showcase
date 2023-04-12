import React from "react";

import classes from "./Widget.module.css";

const Widget = (props) => {
  return (
    <div className={classes.widget}> 
      <div className={classes.widgetTitle}>
        <h4>{props.title}</h4>
      </div>
        {props.children}
    </div>
  );
};

export default Widget;
