import React from "react";
import { Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicketAlt } from "@fortawesome/free-solid-svg-icons";

import classes from "./FoodCard.module.css";

import config from "config";
import ProductImage from "image/demo/p-001.jpg";

const { Title } = Typography;

const FoodCard = ({ item, index }) => {
  return (
    <div key={`item ${index}`} className={classes.cardContainer}>
      <div className={classes.foodImg}>
        <img
          src={
            Array.isArray(item?.image) && item?.image.length > 0
              ? config.getImageHost(item?.image[0])
              : ProductImage
          }
          alt=""
        />
      </div>
      <div className={classes.detail}>
        <div className={classes.foodTitleAndRating}>
          <Title level={4}>{item?.name}</Title>
          {/* <div>{item.foodRating}</div> */}
        </div>

        {/*<div className={classes.foodPriceAndTime}>
        <div>
          <FontAwesomeIcon icon={faTicketAlt} color="green" />
        </div>
        <div className={classes.foodPrice}>
          <p>{item.price} Delivery Fee^</p>
        </div>
        <div className={classes.foodTime}>{item.time}</div>
      </div>*/}
      </div>
    </div>
  );
};

export default FoodCard;
