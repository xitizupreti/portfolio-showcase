import { useContext, useEffect, useState } from "react";
import { CaretLeftFilled } from "@ant-design/icons";

import routeURL from "config/routeURL";
import {
  Col,
  Layout,
  Row,
  Spin,
  Typography,
  Card,
  Button,
  Carousel,
  Modal,
  Divider,
} from "antd";

import { handleError } from "services/util";
import api from "app/web/api";
import config from "config";
import { FilterIcon } from "app/dashboard/components";
import { RegionsContext } from "context/";
import { useIsMobile, useIsTablet } from "hooks/useMediaQuery";
import { OrderTypeContext } from "context/index";

import FoodCategorySlider from "../../search/FoodCategorySlider";
import OrderTypes from "app/web/components/OrderTypes";
import SearchOption from "../../search/SearchOption";
import ProductSlider from "./ProductSlider";

const { Sider, Content } = Layout;
const { Title, Paragraph } = Typography;

const Feed = (props) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const { currentRegionID, getRegionNameByID } = useContext(RegionsContext);

  const [spinning, setSpinning] = useState(false);

  const [featuredRestaurant, setFeaturedRestaurant] = useState([]);
  const [restaurantPackage, setRestaurantPackage] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [restaurantByRegion, setRestaurantByRegion] = useState([]);
  const [regionName, setRegionName] = useState("");
  const { activeOrderType } = useContext(OrderTypeContext);
  const { isDinning, hasOwnDelivery, userPickup } = activeOrderType;

  useEffect(() => {
    setSpinning(true);

    const initializeFeed = async () => {
      try {
        const resPkg = await api.restaurant_package.readAll();
        setRestaurantPackage([...resPkg.data]);
        const foodCats = await api.food_category.readAll();
        setFoodCategory([...foodCats.data]);
        const featuredRes = await api.restaurant.featured_restaurant();
        setFeaturedRestaurant([...featuredRes.data]);
        const resByReg = await api.restaurant.readRestaurantByRegion(
          currentRegionID
        );
        setRestaurantByRegion([...resByReg.data]);
      } catch (error) {
        handleError(error);
      }

      setRegionName(getRegionNameByID(currentRegionID));
    };

    initializeFeed()
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, [currentRegionID, getRegionNameByID]);

  useEffect(() => {
    if (isDinning) {
    } else if (hasOwnDelivery) {
    } else if (userPickup) {
    } else {
    }
  }, [isDinning, hasOwnDelivery, userPickup]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Row style={{ marginTop: 120, padding: `${isMobile ? "0px" : "0 30px"}` }}>
      <Col span={24}>
        {/* ----------foodCategory---------- */}
        <Row align="middle" justify="center">
          <Col xs={24} sm={20}>
            <FoodCategorySlider foodCategories={foodCategory} />
          </Col>
        </Row>

        <Divider />

        {/* ----------get-your-deal---------- */}
        <Row
          align="center"
          justify="middle"
          style={
            !isMobile
              ? { marginTop: "4rem" }
              : { rowGap: "32px", marginTop: "2rem" }
          }
        >
          {spinning ? (
            <Spin />
          ) : (
            <>
              <Col xs={12} sm={12} style={isMobile && { textAlign: "center" }}>
                <Title>Get your Deal?</Title>
                <Paragraph>Search for your cuisine or dishes!</Paragraph>
              </Col>
              <Col xs={24} sm={12} style={isMobile && { textAlign: "center" }}>
                <Carousel dots={false} autoplay>
                  {featuredRestaurant.map((restItem) => (
                    <div key={restItem._id}>
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
                        <Button
                          type="primary"
                          size="middle"
                          shape="round"
                          icon={<CaretLeftFilled />}
                          href={routeURL.web.restaurant_detail(
                            restItem.restaurant._id
                          )}
                          style={{
                            position: "absolute",
                            bottom: "200px",
                            left: "20px",
                          }}
                        >
                          Get this Deal
                        </Button>
                      </Card>
                    </div>
                  ))}
                </Carousel>
              </Col>
            </>
          )}
        </Row>

        <Divider />

        {isTablet ? (
          <Row align="middle" justify="center">
            <Col style={{ padding: "32px 48px 50px 48px" }}>
              <Button size="large" onClick={showModal}>
                <span style={{ marginRight: "8px" }}>Filter</span>
                <FilterIcon height={20} width={20} onClick={showModal} />
              </Button>

              <Modal
                style={{ top: 40 }}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                bodyStyle={{ minHeight: "400px" }}
              >
                <Title level={3}>Filters</Title>
                <Row>
                  <Col>
                    <OrderTypes />
                  </Col>
                </Row>
                <br />
                <SearchOption onSearch={() => {}} query={""} />
              </Modal>
            </Col>
            <Col xs={24} style={{ padding: "0 20px" }}>
              {spinning ? (
                <Row
                  align="middle"
                  justify="center"
                  style={{
                    minHeight: 300,
                  }}
                >
                  <Col>
                    <Spin />
                  </Col>
                </Row>
              ) : (
                <>
                  {/* resturants packages */}
                  {restaurantPackage.map(
                    (resPkg) =>
                      resPkg.restaurants.length !== 0 && (
                        <Row key={resPkg._id} style={{ paddingBottom: "20px" }}>
                          <Col xs={24} style={{ paddingBottom: "20px" }}>
                            <ProductSlider
                              title={resPkg.name}
                              products={resPkg.restaurants}
                            />
                          </Col>
                          <Divider />
                        </Row>
                      )
                  )}

                  {/* resturants in this region */}
                  <Row style={{ paddingBottom: "20px" }}>
                    <Col xs={24} style={{ paddingBottom: "20px" }}>
                      <ProductSlider
                        title={`Restaurants in ${regionName}`}
                        products={restaurantByRegion}
                      />
                    </Col>
                    <Divider />
                  </Row>
                </>
              )}
            </Col>
          </Row>
        ) : (
          <Layout style={{ backgroundColor: "#fff", padding: "50px 0" }}>
            <Sider
              width={300}
              style={{
                padding: "0 20px",
                backgroundColor: "#fff",
                borderRight: "2px solid #f5f5f5",
              }}
            >
              <Row>
                <Col xs={24} style={{ paddingRight: "40px" }}>
                  <SearchOption onSearch={() => {}} query={""} />
                </Col>
              </Row>
            </Sider>
            <Content style={{ padding: "0 20px" }}>
              <Row>
                <Col xs={24}>
                  {spinning ? (
                    <Row
                      align="middle"
                      justify="center"
                      style={{
                        minHeight: 300,
                      }}
                    >
                      <Col>
                        <Spin />
                      </Col>
                    </Row>
                  ) : (
                    <>
                      {/* resturants packages */}
                      {restaurantPackage.map(
                        (resPkg) =>
                          resPkg.restaurants.length !== 0 && (
                            <Row
                              key={resPkg._id}
                              style={{ paddingBottom: "20px" }}
                            >
                              <Col xs={24} style={{ paddingBottom: "20px" }}>
                                <ProductSlider
                                  title={resPkg.name}
                                  products={resPkg.restaurants}
                                />
                              </Col>
                              <Divider />
                            </Row>
                          )
                      )}

                      {/* resturants in this region */}
                      <Row style={{ paddingBottom: "20px" }}>
                        <Col xs={24} style={{ paddingBottom: "20px" }}>
                          <ProductSlider
                            title={`Restaurants in ${regionName}`}
                            products={restaurantByRegion}
                          />
                        </Col>
                        <Divider />
                      </Row>
                    </>
                  )}
                </Col>
              </Row>
            </Content>
          </Layout>
        )}
      </Col>
    </Row>
  );
};

export default Feed;
