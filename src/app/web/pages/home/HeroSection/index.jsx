import React from "react";
import { Row, Col, Typography, Carousel } from "antd";

import { useIsMobile } from "hooks/useMediaQuery";

import { Content } from "antd/lib/layout/layout";
import SearchBar from "../../../components/Header/New/SearchBar/SearchBar";

import HeroImg from "image/banner/home_bg.jpg";
import HomeImg from "image/banner/food_bg_banner.jpg";
import HomeImg2 from "image/banner/resturant_bg_banner.jpg";

const HeroSection = () => {
  // TODO: put this on seperate components

  const isMobileDevice = useIsMobile();

  const carouselImageStyles = {
    height: "100vh",
    backgroundSize: "cover",
    backgroundColor: "black",
    opacity: 0.5,
  };

  return (
    <Content style={{ position: "relative" }}>
      <div>
        <Carousel autoplay dotPosition="bottom" dots={false}>
          <div>
            <div
              style={{
                backgroundImage: `url(${HomeImg})`,
                ...carouselImageStyles,
              }}
            ></div>
          </div>
          <div>
            <div
              style={{
                backgroundImage: `url(${HomeImg2})`,
                ...carouselImageStyles,
              }}
            ></div>
          </div>
          <div>
            <div
              style={{
                backgroundImage: `url(${HeroImg})`,
                ...carouselImageStyles,
              }}
            ></div>
          </div>
        </Carousel>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "45vh",
        }}
      >
        <Typography.Title
          level={isMobileDevice ? 3 : 1}
          style={{
            color: "black",
            fontSize: `${isMobileDevice ? "20px" : "45px"} !important`,
            margin: 0,
            marginBottom: "30px",
            // position: "absolute",
            // bottom: "55vh",
            marginLeft: isMobileDevice ? "16vw" : "25vw",
            marginRight: isMobileDevice ? "103px" : "280px",
          }}
        >
          Your favorite food, delivered with RARA
        </Typography.Title>

        <Row
          style={{
            width: "55%",
            marginLeft: isMobileDevice ? "16vw" : "25vw",
            marginRight: isMobileDevice ? "100px" : "280px",
          }}
        >
          <Col flex="1 1 100px">
            <SearchBar
              showSearchBar={true}
              width={"50vw"}
              style={{ height: "55px" }}
              showButton={true}
            />
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default HeroSection;
