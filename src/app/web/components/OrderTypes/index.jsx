import React, { Fragment, useContext } from "react";
import * as QueryString from "query-string";
import { Typography, Row, Col } from "antd";
import { useLocation, useHistory } from "react-router-dom";
import routeURL from "config/routeURL";
import { OrderTypeContext } from "context/";
import "./index.css";
import { ORDER_TYPES_MAP } from "app/web/pages/search";

const { Text } = Typography;

const OrderTypes = () => {
  const { activeOrderType, setActiveOrderType } = useContext(OrderTypeContext);
  const history = useHistory();
  const location = useLocation();
  const params = QueryString.parse(location.search);
  console.log(params, "------------");

  const { isDinning, hasOwnDelivery, userPickup } = activeOrderType;

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

  const changeOrderType = (typeText) => {
    setActiveOrderType({
      isDinning: false,
      hasOwnDelivery: false,
      userPickup: false,
      [typeText]: true,
    });

    history.push(
      routeURL.params(
        routeURL.web.search(),
        mergeQuery(params, { ord_type: ORDER_TYPES_MAP[typeText] })
      )
    );
  };

  return (
    <Fragment>
      <Row className="pickup-option-container">
        <Col
          span={"auto"}
          className="pickup-option-items"
          style={{
            backgroundColor: hasOwnDelivery ? "#ffffff" : "#eeeeee",
          }}
          onClick={() => changeOrderType("hasOwnDelivery")}
        >
          Delivery
        </Col>
        <Col
          span={"auto"}
          className="pickup-option-items"
          style={{
            backgroundColor: userPickup ? "#ffffff" : "#eeeeee",
          }}
          onClick={() => changeOrderType("userPickup")}
        >
          Pickup{" "}
        </Col>
        <Col
          span={"auto"}
          className="pickup-option-items"
          style={{
            backgroundColor: isDinning ? "#ffffff" : "#eeeeee",
          }}
          onClick={() => changeOrderType("isDinning")}
        >
          Dine-in
        </Col>
      </Row>
    </Fragment>
  );
};

export default OrderTypes;
