import { useContext, useEffect, useState } from "react";
import ProductImage from "image/demo/p-001.jpg";
import { Link } from "react-router-dom";
import routeURL from "config/routeURL";
import config from "config";
import { Tag, Tooltip, Row, Col, Typography, Divider, card } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { getDistanceKM, getDurationFromKM } from "services/location";
import api from "app/web/api";
import { UserContext, UserLoginContext } from "context";
import { notificationError } from "app/web/components/notification";
import { handleError, isRestaurantOpenNow } from "services/util";

const { Title } = Typography;

const styles = {
  productCat: {
    padding: "5px 0px",
  },
  shipping: {
    fontSize: 14,
  },
  productMeta: {
    transform: "unset",
    paddingBottom: "0.5em",
    borderBottom: "1px solid #eee",
    fontSize: "16px",
    width: "350px",
  },
};
export default function Restaurant({ item, itemKey, location, style }) {
  const [wishlistStatus, setWishlistStatus] = useState(null);
  const { clientStore } = useContext(UserContext);
  const [isVisible, setVisible, tab, setTab] = useContext(UserLoginContext);
  const isAuth = clientStore.isAuthenticated;

  useEffect(() => {
    if (isAuth) {
      api.config
        .wishlistStatus(item?._id)
        .then(({ data }) => setWishlistStatus(data))
        .catch(handleError);
    } else {
      setWishlistStatus(false);
    }
  }, [item?._id, isAuth]);

  const showLoginModal = () => {
    setTab("1");
    setVisible(true);
  };

  const addToWishlist = () => {
    if (!isAuth) {
      showLoginModal();
    } else {
      // add to wishlist
      if (item?._id) {
        api.config
          .saveWishlist(item?._id)
          .then(({ data }) => setWishlistStatus(data))
          .catch(handleError);
      } else {
        notificationError("Invalid Product");
      }
    }
  };
  // return <spna>Restaurant detail</spna>;
  const distanceKM = getDistanceKM(
    location?.latitude,
    location?.longitude,
    item?.geo?.latitude,
    item?.geo?.longitude
  );
  const durationDelivery = getDurationFromKM(location, item?.geo);
  return (
    <Col
      style={{
        position: "relative",
        // padding: "20px",
        // marginTop: '10px'
        marginRight: "20px",
        width: "100%",
      }}
    >
      {/* <div
        style={{
          position: "relative",
          padding: '20px',
          // marginTop: '10px'
        }}
    > */}
      <Link
        to={routeURL.web.restaurant_detail(item?._id)}
        className="product-image"
        style={{ borderRadius: "unset" }}
      >
        <div style={{ height: "14vh", position: "relative" }}>
          {isRestaurantOpenNow(item?.openTime) || (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: 2,
              }}
            >
              <div>
                <Tag
                  style={{
                    color: "#fff",
                    // transform: 'rotate(20deg)',
                  }}
                  color="#cd201f"
                >
                  Closed
                </Tag>
              </div>
            </div>
          )}
          <img
            // width = '500px'
            style={{
              width: "450px",
              height: "14vh",
              objectFit: "cover",
            }}
            src={
              Array.isArray(item?.image) && item?.image.length > 0
                ? config.getImageHost(item?.image[0])
                : ProductImage
            }
            alt="img"
          />
        </div>
      </Link>
      <Tooltip
        title={wishlistStatus ? "Remove from Favorites" : "Make it Favorite"}
      >
        <span
          onClick={addToWishlist}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            background: "rgba(255,255,255,0.6)",
            padding: "3px 5px",
            borderRadius: "0px 0px 0px 10px",
            zIndex: 3,
          }}
        >
          {wishlistStatus ? (
            <HeartFilled
              style={{
                fontSize: 28,
                color: "#007f21",
                cursor: "pointer",
              }}
            />
          ) : (
            <HeartOutlined
              style={{
                color: "#007f21",
                fontSize: 28,
                cursor: "pointer",
              }}
            />
          )}
        </span>
      </Tooltip>
      {/* </div> */}
      <div
        className="product-container"
        style={{ marginTop: "0px", padding: "0px 20px 20px 0px" }}
      >
        <Title
          level={5}
          className="product-title"
          style={({ marginTop: -10 }, style)}
        >
          <Link
            to={routeURL.web.restaurant_detail(item?._id)}
            style={{ color: "#000", fontSize: "16px" }}
          >
            {item?.name}
          </Link>
        </Title>
        {/* <div className="product-meta" style={styles.productMeta}>
        <span className="shipping" style={styles.shipping}>
          {item?.category && (
            <span
              style={{
                marginRight: 8,
                marginTop: "-10px",
              }}
              className="currency"
            >
              {item?.category}
            </span>
          )}
          <span className="duration">
            {distanceKM >= 0 && distanceKM}
            {location && item?.geo && (
              <span
                  style={{
                    marginLeft: 8,
                  }}
                >
                  {durationDelivery >= 0 && durationDelivery}
                </span>
              )}
            </span>
        </span>
      </div> */}
        {/* <Divider /> */}
        {/* <div className="product-cat" style={styles.productCat}>
        {item?.famousFor?.map((each) => (
          <span
            style={{
                marginRight: 8,
              }}
            >
              • {each}
            </span>
          ))}
        </div> */}
      </div>
      {/* </Col> */}
    </Col>
  );
}
