import React from "react";

import classes from './keyCard.module.css'

const KeyCard = (props) => {
  return (
    <>
      {props.keys.map((key, i) => {
        return (
          <div key={i} className={classes.container}>
            <div className={classes.cardImg}>
              <img src={key.keyImage} alt="" />
            </div>
            <div className={classes.cardDetail}>
              <h3>{key.keyTitle}</h3>
              <p>{key.keyDescription}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default KeyCard;
