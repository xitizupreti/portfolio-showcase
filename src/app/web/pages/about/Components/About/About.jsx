import React from "react";

import Head1 from "../Head/Head1/Head1";
import classes from "./About.module.css";
import chefImg from "../../assets/images/chef.jpg";
import signImg from "../../assets/images/sign.png";

const About = () => {
  const txt = {
    title: "About us",
    spanTxt1: "Citadela",
    text: "is a modern bistro ",
    brokeTxt: "of the 21st century",
  };

  return (
    <div className={classes.container}>
      <Head1 txt={txt} />
      <div className={classes.content}>
        <div className={classes.ImgContainer}>
          <img src={chefImg} alt="" />
        </div>
        <div className={classes.detail}>
          <div className={classes.paragraph}>
            <p>
              Non numquam eius modi tempora incidunt ut labore et dolore magnam
              aliquam quaerat voluptatem. Ut aut reiciendis voluptatibus maiores
              alias consequatur aut perferendis doloribus asperiores repellat.
              Architecto beatae vitae dicta sunt explicabo.
            </p>
            <p>
              Temporibus autem quibusdam et aut officiis debitis aut rerum
              necessitatibus saepe eveniet ut et voluptates repudiandae sint et
              molestiae non recusandae. Et harum quidem rerum facilis est et
              expedita distinctio.
            </p>
          </div>
          <div className={classes.sign}>
            <img src={signImg} alt="" />
          </div>
        </div>
      </div>
      <div className={classes.innerHolder}>
        <hr />
      </div>
    </div>
  );
};

export default About;
