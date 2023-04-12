import React, { useState, useEffect, useRef } from "react";

import SwiperComp from "./SwiperComp";
import Heading from "./Heading";

import { useIsMobile, useIsTablet } from "hooks/useMediaQuery";
import UseWindowDimensions from "services/useWindowDimensions";

const ProductSlider = ({ products, title }) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [activeSlide, setActiveSlide] = useState(0);
  const windowDimension = UseWindowDimensions();

  const sliderRef = useRef();

  const navigationNext = () => {
    sliderRef.current.slickNext();
  };

  const navigationPrevious = () => {
    sliderRef.current.slickPrev();
  };

  const getSliderLength = () => {
    if (windowDimension.width <= 900) return 1;
    else if (windowDimension.width <= 1200) return 2;
    else if (windowDimension.width <= 1700) return 3;
    else return 3;
  };

  const isNextBtnDisabled = products.length - getSliderLength() === activeSlide;

  return (
    <div>
      <Heading
        title={title}
        isMobile={isMobile}
        isTablet={isTablet}
        navigationNext={navigationNext}
        navigationPrevious={navigationPrevious}
        disablePrevButton={activeSlide === 0}
        disableNextButton={isNextBtnDisabled}
      />
      <SwiperComp
        products={products}
        reference={sliderRef}
        activeSlide={activeSlide}
        setActiveSlide={setActiveSlide}
      />
    </div>
  );
};

export default ProductSlider;
