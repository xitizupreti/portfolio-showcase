import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

import classes from "./SwiperComp.module.css";

import FoodCard from "../FoodCard/FoodCard";

const SwiperComp = (props) => {
  const slides = [];

  props.items.map((item, i) => {
    return slides.push(<FoodCard key={i} item={item} index={i} />);
  });

  const settings = {
    beforeChange: (_, next) => {
      props.setActiveSlide(next);
    },
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className={classes.swiper}>
      <Slider ref={props.reference} {...settings}>
        {slides}
      </Slider>
    </div>
  );
};

export default SwiperComp;
