import React from "react";

import Hero from "./Components/Hero/Hero";
import About from "./Components/About/About";
import classes from "./index.module.css";
import Location from "./Components/Location/Location";
import AboutFoodAndDelivery from "./Components/AboutFoodAndDelivery/AboutFoodAndDelivery";
import DeliveryServices from "./Components/DeliveryServices/DeliveryServices";
import SpecialOffer from "./Components/SpecialOffer/SpecialOffer";
import QandA from "./Components/QandA/QandA";

const AboutUs = () => {
  return (
    <div className={classes.mainContainer}>
      <Hero />
      <About />
      <Location />
      <AboutFoodAndDelivery />
      <DeliveryServices />
      <SpecialOffer />
      <QandA />
    </div>
  );
};

export default AboutUs;
