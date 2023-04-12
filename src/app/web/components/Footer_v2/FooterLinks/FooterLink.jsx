import React from "react";

import classes from "./FooterLink.module.css";

const FooterLink = () => {
  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <div className={classes.linksContainer}>
          <ul className={classes.links}>
            <li>
              <a href=".">Home</a>
            </li>
            <li>
              {" "}
              <a href=".">Contact us</a>
            </li>
          </ul>
        </div>
        <div className={classes.linksContainer}>
          <ul className={classes.links}>
            <li>
              <a href=".">How it works</a>
            </li>
            <li>
              <a href=".">Privacy policy</a>
            </li>
          </ul>
        </div>
        <div className={classes.linksContainer}>
          <ul className={classes.links}>
            <li>
              <a href=".">Our mission</a>
            </li>
            <li>
              <a href=".">Learn more</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={classes.contactBtn}>
        <button>CONTACT US</button>
      </div>
    </div>
  );
};

export default FooterLink;
