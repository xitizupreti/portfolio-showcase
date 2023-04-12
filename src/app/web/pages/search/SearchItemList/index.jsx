import React, { useState, useRef } from "react";

import SwiperComp from "./SwiperComp/SwiperComp";
import Heading from "./Heading/Heading";

import { useIsMobile, useIsTablet, useMidDevice } from "hooks/useMediaQuery";

const SearchItemList = ({ items, title }) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isMid = useMidDevice();
  const [activeSlide, setActiveSlide] = useState(0);

  const sliderRef = useRef();

  const navigationNext = () => {
    sliderRef.current.slickNext();
  };

  const navigationPrevious = () => {
    sliderRef.current.slickPrev();
  };

  const getSliderLength = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    if (isMid) return 3;
    return 4;
  };

  const isNextBtnDisabled = items.length - getSliderLength() === activeSlide;
  console.log(isNextBtnDisabled, "isNextBtnDisabled", items.length);

  return (
    <div>
      <Heading
        title={title}
        navigationNext={navigationNext}
        navigationPrevious={navigationPrevious}
        disablePrevButton={activeSlide === 0}
        disableNextButton={isNextBtnDisabled}
      />
      <SwiperComp
        items={items}
        reference={sliderRef}
        activeSlide={activeSlide}
        setActiveSlide={setActiveSlide}
      />
    </div>
  );
};

export default SearchItemList;
