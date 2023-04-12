import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import config from "config";
import ProductImage from "image/demo/p-001.jpg";

import classes from "./index.module.css";
import { Link } from "react-router-dom";

const ProductCard = ({ index, product }) => {
  const productImg =
    Array.isArray(product?.image) && product?.image.length > 0
      ? config.getImageHost(product?.image[0])
      : ProductImage;

  return (
    <Link to={"/restaurant/" + product._id} style={{ width: "100%" }}>
      <div key={`product ${index}`} className={classes.cardContainer}>
        <div className={classes.productImg}>
          <img src={productImg} alt="" />
        </div>
        <div className={classes.detail}>
          <div className={classes.productTitleAndRating}>
            <h3>{product.name}</h3>
            {/* {<div>{props.product.productRating}</div>} */}
          </div>

          {/* <div className={classes.productPriceAndTime}> */}
          {/*   <div> */}
          {/*     <FontAwesomeIcon icon={faTicketAlt} color="green" /> */}
          {/*   </div> */}
          {/*   <div className={classes.productPrice}> */}
          {/*     <p>{props.product.price} Delivery Fee^</p> */}
          {/*   </div> */}
          {/*   <div className={classes.productTime}>{props.product.time}</div> */}
          {/* </div> */}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
