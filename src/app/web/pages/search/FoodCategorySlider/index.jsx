import React from "react";
import Slider from "react-slick";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";

import ProductImage from "image/demo/p-001.jpg";
import routeURL from "config/routeURL";
import config from "config";
import { useIsMobile, useIsTablet, useMidDevice } from "hooks/useMediaQuery";

function FoodCategorySlider({ foodCategories }) {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isMid = useMidDevice();

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 12,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          initialSlide: 0,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 0,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  return (
    <div>
      <link
        rel="stylesheet"
        type="text/css"
        charset="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <Slider {...settings} dots={false}>
        {foodCategories.map((item, idx) => {
          return (
            <Col key={idx}>
              <Row justify="center">
                <Link
                  style={{ textAlign: "center", alignItems: "center" }}
                  className="product-image"
                  to={routeURL.params(
                    routeURL.web.search(),
                    `category=${item.name}`
                  )}
                >
                  <img
                    height={isMobile ? 120 : 70}
                    width={isMobile ? 120 : 70}
                    style={{ objectFit: "cover", borderRadius: "5px" }}
                    // style = {{borderRadius: item.availableFoodCategory && '50%'}}
                    src={
                      Array.isArray(item.images) && item.images.length > 0
                        ? config.getImageHost(item.images[0])
                        : ProductImage
                    }
                    alt={item.name}
                  />
                </Link>
              </Row>
              <Row justify="center">
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.1,
                    marginTop: "5px",
                    textAlign: "center",
                    color: "#000",
                  }}
                >
                  {item.name}
                </p>
              </Row>
            </Col>
          );
        })}
      </Slider>
    </div>
  );
}

export default FoodCategorySlider;
