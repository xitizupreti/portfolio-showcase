import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

import classes from "./index.module.css";

import ProductCard from "../ProductCard";

const SwiperComp = (props) => {
  const slides = [];

  props.products.map((product, i) => {
    return slides.push(<ProductCard key={i} product={product} index={i} />);
  });

  const settings = {
    beforeChange: (_, next) => {
      props.setActiveSlide(next);
    },
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    centerMode: false,
    dots: false,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          // initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <>
      <Slider ref={props.reference} {...settings}>
        {slides}
      </Slider>
    </>
  );
};

export default SwiperComp;
