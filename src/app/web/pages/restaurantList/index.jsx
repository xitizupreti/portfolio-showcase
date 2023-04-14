import {
  Col,
  Row,
  Typography,
  Carousel,
  Layout,
  Card,
  Button,
  Modal,
  Spin,
} from "antd";
import api from "app/web/api";
import Container from "app/web/components/Container";
import { notificationError } from "app/web/components/notification";
import routeURL from "config/routeURL";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { geolocated } from "react-geolocated";
import { Link, useHistory } from "react-router-dom";
import { handleError } from "services/util";
import FoodProduct from "../home/FoodProduct";
import Spinner from "app/dashboard/components/Spinner";
import { default as useBreakpoint } from "services/Breakpoint";
import Slider from "react-slick";
import ProductImage from "image/demo/p-001.jpg";
import config from "config";
import { CaretLeftFilled } from "@ant-design/icons";
import SearchOption from "../search/SearchOption";
import { FilterIcon } from "app/dashboard/components";
import EmptyResult from "../search/EmptyResult";

const { Sider, Content } = Layout;
const { Title, Paragraph } = Typography;

function RestaurantList(props) {
  let history = useHistory();

  const { isGeolocationAvailable, isGeolocationEnabled, coords } = props;

  const point = useBreakpoint();
  const isMobileDevice = () => ["xs", "sm"].includes(point);

  const [restaurants, setRestaurants] = useState([]);
  let stringQuery = queryString.parse(props.location.search);
  const [error, setError] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [title, setTitle] = useState("");
  const [foodCategory, setFoodCategory] = useState([]);
  const [featuredRestaurant, setFeaturedRestaurant] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  // const [state, setState] = useEffect(true)

  // const params = QueryString.parse(props.location.search);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   setSpinning(true);
  //   setSearchResult([]);
  //   const paramQuery = {};
  //   if (params.q) paramQuery.keyword = params.q;
  //   if (params.popularity) paramQuery.popularity = params.popularity;
  //   if (params.price) paramQuery.price = params.price;
  //   if (params.dietary) paramQuery.dietary = params.dietary;
  //   paramQuery.page = 1;
  //   paramQuery.size = perPageLimit;
  //   paramQuery.result_type = "restaurant";
  //   api.restaurant_package
  //     .readAll(paramQuery)
  //     .then(({ data, hasMore }) => {
  //       setSearchResult(data);
  //       setPagination({
  //         hasMore,
  //         page: 2,
  //       });
  //       initialResPackage = [...data];
  //     })
  //     .catch(handleError)
  //     .finally(() => setSpinning(false));
  // }, [params.q, params.popularity, params.dietary, params.price]);

  // const mergeQuery = (query, extra) => {
  //   const paramsQuery = {
  //     ...query,
  //     ...extra,
  //   };
  //   const allkeys = Object.keys(paramsQuery);
  //   if (allkeys.length === 0) return "";
  //   const qString = allkeys
  //     .map((each) => each !== "none" && `${each}=${paramsQuery[each]}`)
  //     .filter((each) => !!each)
  //     .join("&");
  //   return qString;
  // };
  // const onSearch = (key, value) => {
  //   history.push(
  //     routeURL.params(
  //       routeURL.web.search(),
  //       mergeQuery(params, { [key]: value })
  //     )
  //   );
  // };

  useEffect(() => {
    setSpinning(true);
    if (stringQuery.category) {
      setTitle();
      api.restaurant
        .readRestaurantByCategory(stringQuery.category)
        .then(({ data, title }) => {
          setAllRestaurants(data);
          setRestaurants(data);
          setTitle(title);
        })
        .catch(handleError)
        .finally(() => setSpinning(false));
    } else if (stringQuery.region) {
      setTitle();
      api.restaurant
        .readRestaurantByRegion(stringQuery.region)
        .then(({ data, title }) => {
          setAllRestaurants(data);
          setRestaurants(data);
          setTitle(title);
        })
        .catch(handleError)
        .finally(() => setSpinning(false));
    } else if (stringQuery["near-me"]) {
      console.log("isGeolocationEnabled inside", isGeolocationEnabled, coords);
    } else {
      setError("not-matching-query");
    }
  }, []);

  useEffect(() => {
    setSpinning(true);
    api.food_category
      .readAll()
      .then(({ data }) => setFoodCategory(data))
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, []);

  useEffect(() => {
    api.restaurant.featured_restaurant().then(({ data }) => {
      setFeaturedRestaurant([...data]);
    });
  }, []);

  const [toFetch, setToFetch] = useState(true);
  useEffect(() => {
    console.log("isGeolocationEnabled", isGeolocationEnabled, coords?.latitude);
    if (
      toFetch &&
      stringQuery["near-me"] &&
      coords &&
      isGeolocationEnabled &&
      coords.latitude
    ) {
      console.log(
        "isGeolocationEnabled outside inside",
        isGeolocationEnabled,
        coords?.latitude
      );
      setToFetch(false);
      setTitle("Restaurant Near me");
      api.restaurant
        .readRestaurantNearMe(coords?.latitude, coords?.longitude)
        .then(({ data, title }) => {
          setAllRestaurants(data);
        })
        .catch(handleError)
        .finally(() => setSpinning(false));
    }
  }, [stringQuery, isGeolocationEnabled, coords?.latitude, toFetch]);

  const getError = () => {
    switch (error) {
      case "not-matching-query":
        return (
          <Typography.Title>
            We couldnot find what you are looking for.{" "}
            <Link to={routeURL.web.home()}>Go to H</Link>
          </Typography.Title>
        );
        break;

      default:
        break;
    }
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 12,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  // const params = queryString.parse(props.location.search);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // const mergeQuery = (query, extra) => {
  //   const paramsQuery = {
  //     ...query,
  //     ...extra,
  //   };
  //   const allkeys = Object.keys(paramsQuery);
  //   if (allkeys.length === 0) return "";
  //   const qString = allkeys
  //     .map((each) => each !== "none" && `${each}=${paramsQuery[each]}`)
  //     .filter((each) => !!each)
  //     .join("&");
  //   return qString;
  // };

  // const onSearch = (key, value) => {
  //   console.log("key", key);
  //   console.log("value", value);
  //   allRestaurants &&
  //   allRestaurants.map((restaurant, index) =>
  //       value !== 'none' && restaurant.dietPlans.length > 0
  //         ? setRestaurants(
  //             allRestaurants.filter((item) => item.dietPlans.includes(value))
  //           )
  //         : value === 'none' ? setRestaurants(allRestaurants) :setRestaurants([])
  //     );
  // };

  return (
    <div
      style={{
        width: "100%",
        paddingTop: 100,
      // marginLeft: 50
    }}
  >
    <div className="container" style={{ textAlign: "center" }}>
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
          {foodCategory.map((item, idx) => {
            return (
              <Col>
              <Row justify="center">
                <Link
                  style={{ textAlign: "center", alignItems: "center" }}
                  className="product-image"
                  to={
                    item.availableFoodCategory
                      ? routeURL.web.restaurant_list(
                            `category=${item.geo._id}`
                          )
                        : routeURL.params(
                            routeURL.web.search(),
                            `q=${item.name}`
                          )
                    }
                  >
                    <img
                      height={isMobileDevice() ? 120 : 70}
                      width={isMobileDevice() ? 120 : 70}
                      style={{ objectFit: "cover", borderRadius: "5px" }}
                      // style = {{borderRadius: item.availableFoodCategory && '50%'}}
                      src={
                        Array.isArray(item.images) && item.images.length > 0
                          ? config.getImageHost(item.images[0])
                          : ProductImage
                      }
                      alt
                    />
                  </Link>
                </Row>
                <Row justify="center">
                  <p
                    style={{
                      fontSize: isMobileDevice() ? "16px" : "16px",
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
      <Container>
        <Row
          style={
            !isMobileDevice()
              ? { marginTop: "4rem" }
              : { rowGap: "32px", marginTop: "2rem" }
          }
          // align = 'middle'
        >
          <Col
            xs={24}
            sm={12}
            style={isMobileDevice() && { textAlign: "center" }}
          >
            <Title>Get your Deal?</Title>
            <Paragraph>Search for your cuisine or dishes!</Paragraph>
          </Col>
          <Col
            xs={isMobileDevice() ? { span: 16, offset: 4 } : 24}
            sm={12}
            style={isMobileDevice() && { textAlign: "center" }}
          >
            <Carousel dots={false} autoplay>
              {featuredRestaurant.map((restItem) => (
                <div>
                  <Card
                    style={{ border: "none" }}
                    cover={
                      <img
                        alt="Featured Restaurant"
                        src={
                          featuredRestaurant.length !== 0
                            ? `${config.API_HOST}/api/imageUpload/image/${restItem.restaurant.image[0]}`
                            : `https://api.rarafoods.com.au/api/imageUpload/image/restaurant_1635277493.jpg`
                        }
                        height="200px"
                        style={{
                          objectFit: "cover",
                          border: "1px solid #f5f5f5",
                          position: "relative",
                        }}
                      />
                    }
                  >
                    {/* <Link to = {routeURL.web.restaurant_detail(
                            restItem.restaurant._id
                          )}> */}
                    <Button
                      type="primary"
                      size="middle"
                      shape="round"
                      icon={<CaretLeftFilled />}
                      href={routeURL.web.restaurant_detail(
                        restItem.restaurant._id
                      )}
                      style={{ position: "absolute", bottom: "200px" }}
                    >
                      Get this Deal
                    </Button>
                    {/* </Link> */}
                  </Card>
                </div>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>
      {spinning ? (
        <Spinner />
      ) : error ? (
        <Container>{getError()}</Container>
      ) : (
        <Container>
          {isMobileDevice() ? (
            <>
              <Col xs={{ span: 8, offset: 8 }} style={{ padding: "32px 48px" }}>
                <Button size="large" onClick={showModal}>
                  <span style={{ marginRight: "8px" }}>Filter</span>
                  <FilterIcon height={20} width={20} onClick={showModal} />
                </Button>

                <Modal
                  style={{ top: 40 }}
                  open={isModalVisible}
                  onCancel={handleCancel}
                  footer={null}
                  bodyStyle={{ minHeight: "400px" }}
                >
                  <Title level={3}>Filters</Title>
                  <br />
                  <SearchOption onSearch={() => {}} query={"test"} />
                </Modal>
              </Col>
            </>
          ) : (
            <Layout style={{ backgroundColor: "#fff", padding: "50px 0" }}>
              <Sider
                style={{
                  backgroundColor: "#fff",
                  borderRight: "2px solid #f5f5f5",
                }}
              >
                <Col xs={24} style={{ padding: "20px" }}>
                  <SearchOption onSearch={() => {}} query={"test"} />
                </Col>
              </Sider>
              <Content>
                <Row
                  style={{
                    padding: isMobileDevice() ? "20px" : "40px 50px 50px 90px",
                    width: "100%",
                  }}
                >
                  {/* <Row
            style={{
              marginTop: 16,
            }}
          > */}
                  {restaurants.map((restaurant) => (
                    <Col xs={24} md={8} lg={12}>
                      <FoodProduct
                        location={props.isGeolocationAvailable && props.coords}
                        item={restaurant}
                        key={restaurant._id}
                      />
                    </Col>
                  ))}
                  {/* </Row> */}
                </Row>
              </Content>
            </Layout>
          )}
        </Container>
      )}
    </div>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  isOptimisticGeolocationEnabled: true,
  watchPosition: false,
  userDecisionTimeout: 10000,
})(RestaurantList);
