import React, { useState, useEffect } from "react";
import { Layout, Tag, Row, Typography, Col, Popconfirm, Divider } from "antd";
import api from "app/dashboard/api";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import routeURL from "config/routeURL";

const OrderNotification = ({
  setOrderCount,
  setNotificationVisible,
  order,
  handleOrderClick,
  handleClick,
  orderCount,
}) => {
  // const [orderCount, setOrderCount] = useState(1)

  const [color, setColor] = useState("");
  return (
    <Row
      onBlur={() => setNotificationVisible(false)}
      style={{
        width: 300,
        backgroundColor: "#ffffff",
        position: "absolute",
        top: 70,
        right: 20,
        maxHeight: "calc(100vw - 80px)",
        zIndex: 3,
        padding: 15,
        position: "fixed",
        borderRadius: "5px",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          backgroundColor: "#fff",
        }}
      >
        <Row justify="space-between" align="middle">
          <Typography.Title level={5}>Your Order</Typography.Title>
        </Row>
        <Divider />

        <Row style={{ marginTop: "15px" }}>
          <Col>
            {orderCount > 0 ? (
              order.map((order, idx) => {
                return (
                  <Link to={routeURL.cms.pending_order()}>
                    <div
                      style={{
                        marginBottom: "10px",
                        backgroundColor: color,
                        padding: "0 10px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleOrderClick(order._id)}
                    >
                      {order.restaurantId.name}:{" "}
                      {order.cartId.foods.map((item, index) => {
                        return (
                          <span
                            style={{
                              color: "#05A357",
                            }}
                          >
                            {item.atm.name}
                          </span>
                        );
                      })}
                      {/* </Row> */}
                    </div>
                  </Link>
                );
              })
            ) : (
              <p>No New Notifications</p>
            )}
          </Col>
        </Row>
      </div>
    </Row>
  );
};

export default OrderNotification;
