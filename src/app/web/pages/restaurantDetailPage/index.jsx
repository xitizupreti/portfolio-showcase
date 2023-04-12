import Icon, { HeartFilled, HeartOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  Divider,
  Menu,
  Modal,
  Row,
  Space,
  Tabs,
  Tag,
  Tooltip,
  Typography,
  Rate,
} from "antd";
import api from "app/web/api";
import Container from "app/web/components/Container";
import Loader from "app/web/components/Loader";
import { notificationError } from "app/web/components/notification";
import config from "config";
import HeroImage from "image/demo/hero-002.jpg";
import { useContext, useEffect, useRef, useState } from "react";
import "./index.css";
import NoRestaurantFound from "./NoRestaurantFound";
import MapViewer from "app/dashboard/components/MapViewer";
import { MarkerAlt, EmailOpenIcon } from "image/icon-svg";
import moment from "moment";
import FoodDetailModal from "./FoodDetailModal";
import { UserContext, UserLoginContext } from "context";
import { handleError, isRestaurantOpenNow } from "services/util";
import { HEADER_HEIGHT } from "app/web/components/Header";
import DOMPurify from "dompurify";
import ReviewList from "./ReviewList";
import clsx from "clsx";
import RestaurantRating from "./RestaurantRating";
import ReviewModal from "./ReviewModal";
import { default as useBreakpoint } from "services/Breakpoint";
import ProductImage from "image/demo/p-001.jpg";

const { Paragraph } = Typography;

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
var headerPosition = null;
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const getPrice = (food) => {
  let { price, discountType, discountAmount, discountPercent } = food;
  switch (discountType) {
    case "percent":
      if (discountPercent > 0 && discountPercent <= 100) {
        price = price - (price * discountPercent) / 100;
      }
      break;
    case "amount":
      if (discountAmount > 0 && discountAmount <= price) {
        price = price - discountAmount;
      }
      break;

    default:
      break;
  }
  return price;
};

const RestaurantDetailModal = ({ data, detailPreview, setDetailPreview }) => {
  const timeFormat = "hh:mm a";
  const getOpeningTimeUI = (openingTime) => {
    if (openingTime.isSameTimeEveryDay) {
      const opentimeDay = openingTime?.everyday;
      return (
        <Row
          style={{
            width: "100%",
            marginTop: 8,
          }}
          gutter={16}
        >
          <Col>EveryDay</Col>
          <Col>
            {`${moment(opentimeDay?.startTime).format(timeFormat)}-${moment(
              opentimeDay?.endTime
            ).format(timeFormat)}`}
          </Col>
        </Row>
      );
    } else
      return (
        <Row
          style={{
            paddingLeft: 8,
          }}
        >
          {days.map((day) => {
            const opentimeDay = openingTime[day];
            const isClosed = opentimeDay.isClosed;
            return (
              <Row
                style={{
                  width: "100%",
                  marginTop: 8,
                }}
                gutter={16}
              >
                <Col>{capitalizeFirstLetter(day)}</Col>
                <Col>
                  {isClosed
                    ? "Closed"
                    : `${moment(opentimeDay.startTime).format(
                        timeFormat
                      )}-${moment(opentimeDay.endTime).format(timeFormat)}`}
                </Col>
              </Row>
            );
          })}
        </Row>
      );
  };
  let restaurantGeo = null;
  if (
    Array.isArray(data?.geo?.coordinates) &&
    data?.geo?.coordinates[1] &&
    data?.geo?.coordinates[0]
  ) {
    restaurantGeo = {
      latitude: data?.geo?.coordinates[1],
      longitude: data?.geo?.coordinates[0],
    };
  }
  return (
    <Modal
      className="restaurant-detail-modal"
      title={data.name}
      style={{ top: 20 }}
      visible={detailPreview}
      cancelButtonProps={null}
      onCancel={() => setDetailPreview(false)}
      onOk={() => setDetailPreview(false)}
    >
      <div
        style={{
          height: 250,
          marginBottom: 10,
        }}
      >
        {restaurantGeo && (
          <MapViewer
            activeMarker={{
              ...restaurantGeo,
              name: data.name,
            }}
            height={400}
            options={{
              zoom: 12,
              disableDefaultUI: true,
            }}
          />
        )}
      </div>
      <div
        style={{
          padding: "5px 20px 10px",
        }}
      >
        <Typography.Text
          style={{
            fontSize: 22,
          }}
        >
          Location and Opening Time
        </Typography.Text>
        <Row
          align="middle"
          gutter={8}
          style={{
            marginTop: 8,
            marginBottom: 8,
          }}
        >
          <Col>
            <Icon component={MarkerAlt} />{" "}
          </Col>
          <Col>
            <Typography.Text>
              {data.address && data.address.street}
            </Typography.Text>
          </Col>
        </Row>
        <Collapse
          defaultActiveKey={[data?.openTime?.isSameTimeEveryDay ? "1" : "0"]}
          // onChange={callback}
          expandIconPosition={"right"}
        >
          <Collapse.Panel
            key="1"
            header={
              <Row align="middle" gutter={8}>
                <Col>
                  <Icon component={EmailOpenIcon} />{" "}
                </Col>
                <Col>
                  <Typography.Text
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    Hours
                  </Typography.Text>
                </Col>
              </Row>
            }
          >
            {getOpeningTimeUI(data.openTime)}
          </Collapse.Panel>
        </Collapse>
      </div>
    </Modal>
  );
};

const HeroSection = ({
  data,
  wishlistStatus,
  addToWishlist,
  isOpen,
  reviewDetail,
  onReviewClick,
  setReviewSpinning,
  reviewSpinning,
  refreshReviews,
  restaurantId,
}) => {
  const [ratePreview, setRatePreview] = useState(false);
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  console.log("review detail", reviewDetail);

  const point = useBreakpoint();
  const isMobileDevice = () => ["xs", "sm"].includes(point);

  return (
    <div
      className="hero-section page-banner"
      style={{
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      <div className="hero-content-wrapper">
        <img
          src={
            data.image.length > 0
              ? config.getImageHost(data.image[0])
              : HeroImage
          }
          alt
        />
      </div>
      <ReviewModal
        isModalVisible={ratePreview}
        handleCancel={() => setRatePreview(false)}
        setReviewSpinning={setReviewSpinning}
        reviewSpinning={reviewSpinning}
        refreshReview={refreshReviews}
        reviewDetail={reviewDetail}
        restaurantId={restaurantId}
      />
      <>
        <Container outerStyle={{ marginTop: "40px" }}>
          <Row align="middle">
            <Col style={{ marginRight: "10px" }}>
              <div className="page-header">
                {isOpen || (
                  <div
                    style={{
                      marginBottom: 16,
                    }}
                  >
                    <Tag color="#cd201f">
                      Restaurant is Closed Now, Visit later.
                    </Tag>
                  </div>
                )}
                <Row align="middle" justify="space-between">
                  <Row align="middle">
                    <Col>
                      <h2>{data.name}® </h2>
                    </Col>
                    <Col>
                      <p
                        className="review"
                        onClick={() => setRatePreview(true)}
                        style={{
                          cursor: "pointer",
                          color: "#FFD700",
                        }}
                      >
                        {/* {[...Array(5).keys()].map((each) => (
                      <i
                        className="fas fa-star"
                        style={{
                          color:
                            each + 1 <= reviewDetail &&
                            Math.ceil(reviewDetail.rating) &&
                            "#f5b223",
                        }}
                      />
                    ))} */}
                        <Rate
                          value={
                            reviewDetail &&
                            reviewDetail.reviews &&
                            reviewDetail.reviews.length
                          }
                          disabled={true}
                          style={{ cursor: "pointer" }}
                        ></Rate>
                        <a
                          style={{
                            fontWeight: 400,
                            marginLeft: 4,
                            fontSize: 14,
                          }}
                        >
                          (
                          {reviewDetail &&
                            reviewDetail.reviews &&
                            reviewDetail.reviews.length}{" "}
                          customer{" "}
                          {reviewDetail &&
                          reviewDetail.reviews &&
                          reviewDetail.reviews.length <= 1
                            ? "rating"
                            : "ratings"}
                          )
                        </a>
                        {/* Rate this retaurant */}
                      </p>
                    </Col>
                    {/* <h2 style={{ color: "#fff" }}>
                  {data.name}®{" "}
                  <span>
                    <p
                      className="review"
                      onClick={() => setRatePreview(true)}
                      style={{
                        cursor: "pointer",
                        color: "#FFD700",
                      }}
                    >
                      {[...Array(5).keys()].map((each) => (
                        <i
                          className="fas fa-star"
                          style={{
                            color:
                              each + 1 <= reviewDetail &&
                              Math.ceil(reviewDetail.rating) &&
                              "#f5b223",
                          }}
                        />
                      ))}
                      <a
                        style={{
                          fontWeight: 400,
                          marginLeft: 4,
                          fontSize: 14,
                        }}
                      >
                        {reviewDetail &&
                          reviewDetail.reviews &&
                          reviewDetail.reviews.length}{" "}
                        customer{" "}
                        {reviewDetail &&
                        reviewDetail.reviews &&
                        reviewDetail.reviews.length <= 1
                          ? "rating"
                          : "ratings"}
                      </a>
                    </p>
                  </span>
                </h2> */}
                  </Row>
                  {/* <Col>
                <Tooltip
                  title={
                    wishlistStatus
                      ? "Remove from Favorites"
                      : "Make it Favorite"
                  }
                >
                  <div
                    onClick={addToWishlist}
                    style={{ justifyContent: "flex-end" }}
                  >
                    {wishlistStatus ? (
                      <HeartFilled
                        style={{
                          fontSize: 18,
                          color: "#f50057",
                          cursor: "pointer",
                        }}
                      />
                    ) : (
                      <HeartOutlined
                        style={{
                          color: "#f50057",
                          fontSize: 18,
                          cursor: "pointer",
                        }}
                      />
                    )}
                  </div>
                </Tooltip>
              </Col> */}
                </Row>

                {/* {data.famousFor && data.famousFor.length > 0 && (
              <p>
                <small>{data.famousFor.map((each) => `• ${each} `)}</small>
              </p>
            )} */}

                {/* <p style={{ marginTop: "-15px", color: "#fff" }}>
              {" "}
              {reviewDetail && reviewDetail.rating && reviewDetail.rating} (
              {reviewDetail &&
              reviewDetail.reviews &&
              reviewDetail.reviews.length < 100
                ? reviewDetail.reviews.length
                : "100+"}
              ) • {data.averageDeliveryTime} min
            </p> */}
              </div>
            </Col>
            <Col>
              <Tooltip
                title={
                  wishlistStatus ? "Remove from Favorites" : "Make it Favorite"
                }
              >
                <div
                  onClick={addToWishlist}
                  style={{ justifyContent: "flex-end" }}
                >
                  {wishlistStatus ? (
                    <HeartFilled
                      style={{
                        fontSize: 18,
                        color: "#f50057",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <HeartOutlined
                      style={{
                        color: "#f50057",
                        fontSize: 18,
                        cursor: "pointer",
                      }}
                    />
                  )}
                </div>
              </Tooltip>
            </Col>
          </Row>
        </Container>{" "}
        <Container outerStyle={{}}></Container>{" "}
      </>
    </div>
  );
};

const Food = ({ data, restaurantDetail, isOpen, category }) => {
  const [foodDetail, setFoodDetail] = useState(false);
  return (
    <div>
      {/* <li className="col-md-4 col-sm-6"> */}
      <FoodDetailModal
        restaurantDetail={restaurantDetail}
        data={data}
        preview={foodDetail}
        setPreview={setFoodDetail}
      />
      <Row
        className="product"
        justify="space-around"
        style={{
          boxShadow: "1px 1px 3px 0 rgba(0, 0, 0, 0.2) !important",
          minHeight: "136px",
          padding: "1em",
          position: "relative",
        }}
      >
        <Col className="product-container" lg={10} sm={10} xs={10}>
          <img
            style={{
              width: 150,
              borderRadius: 10,
              cursor: isOpen && "pointer",
              height: "100%",
              objectFit: "cover",
              // filter: isOpen || 'grayscale(50%)',
            }}
            onClick={() => {
              isOpen && data.activeStatus
                ? setFoodDetail(true)
                : !isOpen
                ? notificationError(
                    "Restaurant is currently closed. Please visit later.",
                    "Closed",
                    "bottomRight"
                  )
                : notificationError(
                    `${data.name} is not available right now. Please come back later`,
                    "Not Available",
                    "bottomRight"
                  );
            }}
            src={
              +data.activeImage === -1
                ? ProductImage
                : config.getImageHost(data.activeImage)
            }
            alt
          />
        </Col>
        <Col className="product-container" lg={14} sm={14} xs={14}>
          <span
            style={{}}
            onClick={() =>
              isOpen
                ? setFoodDetail(true)
                : notificationError(
                    "Restaurant is currently closed. Please visit later.",
                    "Closed",
                    "bottomRight"
                  )
            }
            style={{
              cursor: isOpen && "pointer",
              color: "black",
              fontSize: "15px",
            }}
            className="product-title"
          >
            {data.name}
          </span>
          <div
            className="product-meta"
            style={{
              transform: "unset",
              border: "none",
            }}
          >
            <span className="shipping">
              <span className="currency">$</span>
              {getPrice(data)}
            </span>
          </div>
          <div
            className="product-meta"
            style={{
              transform: "unset",
              border: "none",
            }}
          >
            {/* <span className="shipping"> */}
            <Paragraph ellipsis={true}>{data.subTitle}</Paragraph>
            {/* </span> */}
          </div>
        </Col>
      </Row>
      {!data.activeStatus && (
        <div
          style={{
            position: "absolute",
            top: "-1.5%",
          }}
        >
          <Tag
            style={{
              color: "#fff",
              // transform: 'rotate(20deg)',
            }}
            color="#cd201f"
          >
            Out of Stock
          </Tag>
        </div>
      )}
      {/* </li> */}
    </div>
  );
};

// const Food = ({ data, restaurantDetail, isOpen, category }) => {
//   const [foodDetail, setFoodDetail] = useState(false);
//   return (
//     <div>
//       {/* <li className="col-md-4 col-sm-6"> */}
//       <FoodDetailModal
//         restaurantDetail={restaurantDetail}
//         data={data}
//         preview={foodDetail}
//         setPreview={setFoodDetail}
//       />
//       <Row
//         className="product"
//         style={{
//           boxShadow: "1px 1px 3px 0 rgba(0, 0, 0, 0.2) !important",
//           minHeight: "136px",
//           padding: "1em",
//           // height: '100%'
//         }}
//       >
//         <Col className="product-container" lg = {12} sm = {12}>
//           <img
//             style={{
//               width: 150,
//               borderRadius: 10,
//               cursor: isOpen && "pointer",
//               // height: '100%',
//               objectFit: 'cover'
//               // filter: isOpen || 'grayscale(50%)',
//             }}
//             onClick={() =>
//               isOpen
//                 ? setFoodDetail(true)
//                 : notificationError(
//                     "Restaurant is currently closed. Please visit later.",
//                     "Closed",
//                     "bottomRight"
//                   )
//             }
//             src={
//               +data.activeImage === -1
//                 ? ProductImage
//                 : config.getImageHost(data.activeImage)
//             }
//             alt
//           />
//         </Col>
//         {/* <Col lg = {12}>
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt unde nostrum nisi nobis aut explicabo fugit officia. Aut sapiente aliquid ipsum quos. Maxime similique obcaecati molestias quos porro itaque soluta.
//         </Col> */}
//         <Col className="product-container" lg = {12} sm = {12}>
//           <span
//             style={{}}
//             onClick={() =>
//               isOpen
//                 ? setFoodDetail(true)
//                 : notificationError(
//                     "Restaurant is currently closed. Please visit later.",
//                     "Closed",
//                     "bottomRight"
//                   )
//             }
//             style={{
//               cursor: isOpen && "pointer",
// color: "black",
// fontSize: "15px",
//             }}
//             className="product-title"
//           >
//             {data.name}
//           </span>
//           <div
//             className="product-meta"
//             style={{
//               transform: "unset",
//               border: "none",
//             }}
//           >
//             <span className="shipping">
//               <span className="currency">$</span>
//               {getPrice(data)}
//             </span>
//           </div>
//           <div
//             className="product-meta"
//             style={{
//               transform: "unset",
//               border: "none",
//             }}
//           >
//             <Typography.Paragraph ellipsis = {true} className="shipping">
//               {data.subTitle}
//             </Typography.Paragraph>
//           </div>
//         </Col>
//       </Row>
//       {/* </li> */}
//     </div>
//   );
// };
const FoodGroup = ({
  data,
  restaurantDetail,
  isOpen,
  foodCategoryName,
  foodCategory,
  food,
}) => {
  return (
    // <div className="product-sections" id="food-group-container">
    //   <Row
    //     className="product-list"
    //     style={{
    //       width: "100%",
    //     }}
    //   >
    <Food isOpen={isOpen} restaurantDetail={restaurantDetail} data={food} />
    //   </Row>
    // </div>
  );
};

const FoodListing = ({ data, restaurantDetail, isOpen }) => {
  const categoryRef = useRef([]);

  const [menuActive, setMenuActive] = useState(null);
  const [categoryId, setCategoryId] = useState();
  const [food, setFood] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [foodCategory, setFoodCategory] = useState([]);
  const [categorizedFoods, setCategorizedFoods] = useState([]);
  const [foodCategoryName, setFoodCategoryName] = useState("");
  useEffect(() => {
    setSpinning(true);
    api.food
      .readAll()
      .then(({ data }) => {
        const restaurantFoods = data.filter(
          (item) => item.restaurant === restaurantDetail._id
        );
        setCategorizedFoods(restaurantFoods);
      })
      .catch(handleError)
      .finally(() => setSpinning(false));
    api.food_category
      .readAll()
      .then(({ data }) => {
        const filteredData = data.filter((item) =>
          restaurantDetail.availableFoodCategory.map((food) =>
            food._id.includes(item._id.toString())
          )
        );
        setFoodCategory(filteredData);
      })
      .catch(handleError)
      .finally(() => console.log("food: ", foodCategory));
  }, []);

  const goToCategory = (id) => {
    var headerOffset = 80;
    var element = document.getElementById(id);
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition - headerOffset;
    // element.scrollIntoView(true)
    console.log("offsetPosition", offsetPosition);
    window.focus();
    document.body.scrollTo(0, offsetPosition);
    // window.onunload = function(){ window.scrollTo(0,offsetPosition); }
    window.scroll(0, offsetPosition);
  };

  const getVisibleGroup = (height) => {
    data.forEach((each) => {
      const offsetY =
        document &&
        document.getElementById(each._id)?.getBoundingClientRect().top;
      if (offsetY > 0 && offsetY <= height) setMenuActive(each._id);
    });
  };

  let onScroll = (event) => {
    var header = document.getElementById("spy-nav");
    var sticky = header && header.getBoundingClientRect();
    if (!sticky) return;
    const { top, height } = sticky;
    if (!headerPosition) headerPosition = top;
    const pageYOffset = event.srcElement.scrollTop;
    getVisibleGroup(height);
    if (top <= 0 && pageYOffset > headerPosition) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  };
  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", onScroll, true);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [data]);

  const handleMenuClick = (item) => {
    setFoodCategoryName(item.name);
    api.categorized_food
      .read(`${restaurantDetail._id}`, `${item._id}`)
      .then(({ data }) => setCategorizedFoods(data))
      .catch(handleError);
  };

  return (
    <section
      className="product-list-section section"
      style={{ marginBottom: "80px" }}
    >
      <Container>
        <div id="spy-nav" className="spy-bar">
          <Menu
            mode="horizontal"
            inlineCollapse={true}
            className="navbar-nav"
            selectedKeys={[menuActive]}
            style={{ border: "none" }}
            // onSelect={handleMenuClick}
          >
            {/* {console.log('foodCategory', foodCategory)} */}
            {foodCategory.map((item, idx) =>
              categorizedFoods.some((e) => e.foodCategory === item._id) ? (
                <Menu.Item
                  onClick={() => goToCategory(item._id)}
                  className="nav-item"
                  key={item._id}
                  style={{
                    border: "none",
                    // padding: "unset",
                    // backgroundColor: "#eeeeee",
                    marginRight: 14,
                    marginBottom: 16,
                    cursor: "gpointer",
                    // border: "none",
                    color: "#000",
                    padding: "5px 5px",
                    fontSize: "16px",
                    // fontWeight: 500,
                    // borderRadius: "30px",
                    fontFamily: "sans-serif",
                    alignItems: "center",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  {item.name}
                </Menu.Item>
              ) : null
            )}
          </Menu>
        </div>

        {foodCategory.map((item, idx) => {
          return (
            <div id={item._id}>
              {categorizedFoods.some((e) => e.foodCategory === item._id) ? (
                <header
                  className="section-header"
                  style={{
                    paddingTop: 32,
                  }}
                  // ref = {categoryRef}
                >
                  <h4>{item.name}</h4>
                  {console.log("title", item._id)}
                </header>
              ) : null}

              <Row gutter={[16, 16]} style={{ width: "100%" }}>
                {
                  // categorizedFoods.some((e) => e.foodCategory === item._id) ? (
                  categorizedFoods.map((food, index) => {
                    if (food.foodCategory === item._id) {
                      return (
                        <Col sm={24} md={12} lg={6} style={{ width: "100%" }}>
                          <FoodGroup
                            isOpen={isOpen}
                            restaurantDetail={restaurantDetail}
                            data={categorizedFoods}
                            foodCategoryName={foodCategoryName}
                            foodCategory={foodCategory}
                            food={food}
                          />
                        </Col>
                      );
                    }
                  })
                  // ) : (
                  //   <Row
                  //     className="product-list"
                  //     style={{
                  //       width: "100%",
                  //     }}
                  //   >
                  //     {/* <div
                  //       className="product product-container"
                  //       style={{
                  //         backgroundColor: "#e2e2e2",
                  //       }}
                  //     > */}
                  //     <h4
                  //       style={{
                  //         cursor: isOpen && "pointer",
                  //       }}
                  //       className="product-title"
                  //     >
                  //       Coming soon..
                  //     </h4>
                  //     {/* </div> */}
                  //   </Row>
                  // )
                }
              </Row>
            </div>
          );
        })}

        {/* <div className="product-sections" id="food-group-container"> */}
        {/* {data.map((foodGroup) => (
            <FoodGroup
              isOpen={isOpen}
              restaurantDetail={restaurantDetail}
              data={foodGroup}
              foodCategoryName={foodCategoryName}
            />
          ))} */}
        {/* <FoodGroup
            isOpen={isOpen}
            restaurantDetail={restaurantDetail}
            data={categorizedFoods}
            foodCategoryName={foodCategoryName}
            foodCategory={foodCategory}
          /> */}
        {/* </div> */}
        {/* <div className="product-sections" id="food-group-container">
          <FoodGroup
            isOpen={isOpen}
            restaurantDetail={restaurantDetail}
            data={categorizedFoods}
            foodCategoryName={foodCategoryName}
          />
        </div> */}
      </Container>
    </section>
  );
};

export default function RestaurantDetail(props) {
  const reviewRef = useRef(null);

  const point = useBreakpoint();
  const isMobileDevice = () => ["xs", "sm"].includes(point);

  const [wishlistStatus, setWishlistStatus] = useState(null);
  const { clientStore } = useContext(UserContext);
  const [isVisible, setVisible, tab, setTab] = useContext(UserLoginContext);
  const isAuth = clientStore.isAuthenticated;
  const {
    match: {
      params: { itemId },
    },
  } = props;

  const [restaurantDetail, setRestaurantDetail] = useState(null);
  const [reviewDetail, setReviewDetail] = useState(null);
  const [reviewSpinning, setReviewSpinning] = useState(false);
  const [foodGroups, setFoodGroups] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [tabValue, setTabValue] = useState("description");
  const [foodCategory, setFoodCategory] = useState([]);

  useEffect(() => {
    if (isAuth) {
      api.config
        .wishlistStatus(itemId)
        .then(({ data }) => setWishlistStatus(data))
        .catch(handleError);
    } else {
      setWishlistStatus(false);
    }
  }, [itemId, isAuth]);

  const showLoginModal = () => {
    setTab("1");
    setVisible(true);
  };

  const addToWishlist = () => {
    if (!isAuth) {
      showLoginModal();
    } else {
      // add to wishlist
      if (itemId) {
        api.config
          .saveWishlist(itemId)
          .then(({ data }) => setWishlistStatus(data))
          .catch(handleError);
      } else {
        notificationError("Invalid Product");
      }
    }
  };

  useEffect(() => {
    if (itemId) {
      setSpinning(true);
      api.restaurant
        .read(itemId)
        .then(({ data }) => setRestaurantDetail(data))
        .catch(handleError)
        .finally(() => setSpinning(false));
      api.restaurant
        .foodWithGroup(itemId)
        .then(({ data }) => setFoodGroups(data))
        .catch(handleError)
        .finally(() => setSpinning(false));
      api.review
        .read(itemId)
        .then(({ data }) => {
          setReviewDetail(data);
        })
        .catch(handleError)
        .finally(() => setSpinning(false));
      api.food_category
        .readAll()
        .then(({ data }) => {
          const filteredData = data.filter((item) =>
            restaurantDetail.availableFoodCategory.includes(item._id.toString())
          );
          setFoodCategory(filteredData);
        })
        // .then(res => setFoodCategory(res))
        .catch(handleError)
        .finally(() => console.log("food: ", foodCategory));
    }
  }, [itemId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const refreshReviews = () => {
    setReviewSpinning(true);
    api.review
      .read(itemId)
      .then(({ data }) => {
        setReviewDetail(data);
      })
      .catch(handleError)
      .finally(() => setReviewSpinning(false));
  };
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  const isOpen = isRestaurantOpenNow(restaurantDetail?.openTime);
  const scrollToBottom = () => {
    reviewRef.current.scrollIntoView({ behavior: "smooth" });
    setTabValue("review");
  };

  const [isModalVisible, setIsModalVisible] = useState(true);
  const [detailPreview, setDetailPreview] = useState(false);

  return spinning ? (
    <Loader />
  ) : !restaurantDetail ? (
    <NoRestaurantFound />
  ) : (
    <div
      // style={{
      //   paddingTop: HEADER_HEIGHT,
      // }}
      data-offset={100}
    >
      <HeroSection
        refreshReviews={refreshReviews}
        reviewDetail={reviewDetail}
        isOpen={isOpen}
        data={restaurantDetail || {}}
        wishlistStatus={wishlistStatus}
        addToWishlist={addToWishlist}
        setReviewSpinning={setReviewSpinning}
        reviewSpinning={reviewSpinning}
        // refreshReview={refreshReviews}
        reviewDetail={reviewDetail}
        restaurantId={restaurantDetail && restaurantDetail._id}
      />
      <RestaurantDetailModal
        data={restaurantDetail}
        detailPreview={detailPreview}
        setDetailPreview={setDetailPreview}
      />
      <div style={{ padding: "50px 70px 20px 80px" }}>
        <h5>
          {restaurantDetail.address && restaurantDetail.address.street}{" "}
          <span>
            <p>
              {restaurantDetail.category}
              <Button type="link" onClick={() => setDetailPreview(true)}>
                More info
              </Button>
            </p>
          </span>
        </h5>

        {/* <p
          style={{ margin: 0, color: "#000" }}
          dangerouslySetInnerHTML={createMarkup(restaurantDetail.description)}
        /> */}
        <p style={{ color: "#000" }}>
          {" "}
          {reviewDetail && reviewDetail.rating && reviewDetail.rating} (
          {reviewDetail &&
          reviewDetail.reviews &&
          reviewDetail.reviews.length < 100
            ? reviewDetail.reviews.length
            : "100+"}
          ) • {restaurantDetail.averageDeliveryTime} min
        </p>
      </div>
      {/* <div>Food Category Here</div> */}
      <FoodListing
        restaurantDetail={restaurantDetail}
        data={foodGroups}
        isOpen={isOpen}
        foodCategory={foodCategory}
      />
      {/* <section className="product-description-review pt-150">
        <div className="container">
          <div className="product-simple-tab-menu">
            <ul className="nav" ref={reviewRef}>
              <Tabs
                centered
                style={{
                  width: "100%",
                }}
                activeKey={tabValue}
                onChange={(activeKey) => setTabValue(activeKey)}
                defaultActiveKey="description"
              >
                <Tabs.TabPane
                  tab={
                    <span
                      className={clsx(
                        "nav-item nav-link pr-4 pl-4"
                        // active === tab.title && 'active'
                      )}
                      role="tab"
                    >
                      <i className={clsx("pr-2")} />
                      Description
                    </span>
                  }
                  key="description"
                >
                  <div className="">
                    <div
                      className="preview"
                      dangerouslySetInnerHTML={createMarkup(
                        restaurantDetail.description
                      )}
                    />
                  </div>
                </Tabs.TabPane>
                <Tabs.TabPane
                  key="review"
                  tab={
                    <span
                      className={clsx(
                        "nav-item nav-link pr-4 pl-4"
                        // active === tab.title && 'active'
                      )}
                      role="tab"
                    >
                      Reviews (
                      {reviewDetail && reviewDetail.reviews
                        ? reviewDetail.reviews.filter((each) => !!each.review)
                            .length
                        : 0}
                      )
                    </span>
                  }
                >
                  <ReviewList
                    setReviewSpinning={setReviewSpinning}
                    reviewSpinning={reviewSpinning}
                    refreshReview={refreshReviews}
                    reviewDetail={reviewDetail}
                    restaurantId={restaurantDetail && restaurantDetail._id}
                  />
                </Tabs.TabPane>
              </Tabs>
            </ul>
          </div> */}
      {/* <div className="tab-content pt-30">
            <div className="tab-pane fade show active" id="description">
              <div
                className="preview"
                dangerouslySetInnerHTML={createMarkup(
                  productDetail.description
                )}
              ></div>
            </div>
            <div className="tab-pane fade" id="review">
              <ReviewList reviews={reviewDetail} />
            </div>
          </div> */}
      {/* </div>
      </section> */}
      {/* <Container>
        <Divider orientation="left">Description</Divider>
        <Typography.Paragraph>
          {restaurantDetail.description}
        </Typography.Paragraph>
      </Container> */}
    </div>
  );
}
