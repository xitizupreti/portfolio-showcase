import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faFacebookF, faInstagram, faTwitter, faLinkedin  } from '@fortawesome/free-brands-svg-icons';

import classes from './SocialLinks.module.css'

const SocialLinks = () => {
return (
  <div className={classes.container}>
    <div className={classes.icon}>
      <a href="."><FontAwesomeIcon icon={faInstagram} size='lg' color='white'/></a>
    </div>
    <div className={classes.icon}>
      <a href="."><FontAwesomeIcon icon={faTwitter} size='lg' color='white'/></a>
    </div>
    <div className={classes.icon}>
      <a href="."><FontAwesomeIcon icon={faFacebookF} size='lg' color='white'/></a>
    </div>
    <div className={classes.icon}>
      <a href="."><FontAwesomeIcon icon={faLinkedin} size='lg' color='white'/></a>
    </div>
  </div>
  );
};

export default SocialLinks;
