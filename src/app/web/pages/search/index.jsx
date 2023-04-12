import { useContext, useEffect, useState } from "react";
import * as QueryString from "query-string";
import { Link } from "react-router-dom";
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
import SearchResult from "./SearchResult";
import SearchOption from "./SearchOption";
import { default as useBreakpoint } from "services/Breakpoint";
import Container from "app/web/components/Container";
import { handleError } from "services/util";
import EmptyResult from "./EmptyResult";
import SearchItemList from "./SearchItemList/index";
import api from "app/web/api";
import config from "config";
import { useHistory } from "react-router-dom";
import { CaretLeftFilled } from "@ant-design/icons";
import { FilterIcon } from "app/dashboard/components";
import { OrderTypeProvider, OrderTypeContext } from "context/index";
import OrderTypes from "app/web/components/OrderTypes";
import ProductImage from "image/demo/p-001.jpg";
import FoodCategoryCarousel from "../home/FoodCategoryCarousel";
import { useIsMobile, useIsTablet, useMidDevice } from "hooks/useMediaQuery";

import FoodCategorySlider from "./FoodCategorySlider/index";
import { RegionsContext } from "context/regionsContext";

const { Sider, Content } = Layout;
const { Title, Paragraph } = Typography;

const perPageLimit = 15;

export const ORDER_TYPES_MAP = {
  isDinning: "dinein",
  userPickup: "pickup",
  hasOwnDelivery: "delivery",
};

export const POPULARITY_MAP = {
  "Less Popular ": "lessPopular",
  "Somewhat Popular": "someWhatPopular",
  Popular: "popular",
  "Highly Popular": "highlyPopular",
  "Extremely Popular": "extremelyPopular",
};

const Search = (props) => {
  let history = useHistory();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  // const isMid = useMidDevice();

  const params = QueryString.parse(props.location.search);
  const { q: keyword, popularity, price, dietary, ord_type } = params;

  const [searchResult, setSearchResult] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pagination, setPagination] = useState({
    hasMore: false,
    page: 1,
  });

  const [foodCategory, setFoodCategory] = useState([]);

  const { currentRegionID } = useContext(RegionsContext);

  useEffect(() => {
    setSpinning(true);
    api.food_category
      .readAll()
      .then(({ data }) => setFoodCategory(data))
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSpinning(true);
    setSearchResult([]);

    const paramQuery = {};
    // TODO: if (keyword) paramQuery.keyword = keyword;
    if (popularity) paramQuery.popularity = popularity;
    // TODO: if (price) paramQuery.price = price;
    if (dietary) paramQuery.dietry = dietary;
    if (ord_type) paramQuery.orderType = ord_type;

    // paramQuery.page = 1;
    // paramQuery.size = perPageLimit;
    // paramQuery.result_type = "restaurant";

    api.restaurant
      .readRestaurantByRegion(currentRegionID, paramQuery)
      .then(({ data }) => {
        setSearchResult(data);
        // setPagination({
        //   hasMore,
        //   page: 2,
        // });
      })
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, [keyword, popularity, price, dietary, ord_type, currentRegionID]);

  const fetchMoreData = () => {
    // TODO: currently no pagination on api
    return {
      hasMore: false,
      page: 1,
    };
    // const params = {};
    // params.page = pagination.page;
    // params.size = perPageLimit;
    // params.result_type = "restaurant";
    // api.restaurant_package
    //   .readAll(params)
    //   .then(({ data, hasMore }) => {
    //     setSearchResult((result) => [...result, ...data]);
    //     setPagination({
    //       hasMore,
    //       page: pagination.page + 1,
    //     });
    //   })
    //   .catch(handleError)
    //   .finally(() => setSpinning(false));
  };

  const mergeQuery = (query, extra) => {
    const paramsQuery = {
      ...query,
      ...extra,
    };
    const allkeys = Object.keys(paramsQuery);
    if (allkeys.length === 0) return "";
    const qString = allkeys
      .map((each) => each !== "none" && `${each}=${paramsQuery[each]}`)
      .filter((each) => !!each)
      .join("&");
    return qString;
  };

  const onSearch = (key, value) => {
    history.push(
      routeURL.params(
        routeURL.web.search(),
        mergeQuery(params, { [key]: value })
      )
    );
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Row style={{ marginTop: 120 }}>
      <Col span={24}>
        {/* ----------foodCategory---------- */}
        <Row align="middle" justify="center">
          <Col xs={24} sm={20}>
            <FoodCategorySlider foodCategories={foodCategory} />
          </Col>
        </Row>

        <Divider />

        {isTablet ? (
          <Row align="middle" justify="center">
            <Col style={{ padding: "32px 48px" }}>
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
                <SearchOption onSearch={onSearch} query={params} />
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
                  <Spin />
                </Row>
              ) : searchResult.length === 0 ? (
                <EmptyResult />
              ) : (
                <SearchResult
                  spinning={spinning}
                  query={params.q}
                  fetchData={fetchMoreData}
                  pagination={pagination}
                  result={searchResult}
                />
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
                <Col xs={24} style={{ padding: "0 20px" }}>
                  <SearchOption onSearch={onSearch} query={params} />
                </Col>
              </Row>
            </Sider>
            <Content style={{ padding: "20px" }}>
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
                  ) : searchResult.length === 0 ? (
                    <EmptyResult />
                  ) : (
                    <>
                      {/* featured resturants */}
                      <SearchResult
                        spinning={spinning}
                        query={params.q}
                        fetchData={fetchMoreData}
                        pagination={pagination}
                        result={searchResult}
                      />
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

export default Search;
