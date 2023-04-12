import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, Col, Dropdown, Menu, Row } from "antd";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import routeURL from "config/routeURL";
import config from "config";
import defaultProfile from "image/user.png";
import Cart from "app/web/components/Header/Cart";
import { UserLoginContext } from "context/";
import "./index.css";
import { useWindowScroll } from "react-use";
import { default as useBreakpoint } from "services/Breakpoint";
import { useLargeDevice } from "hooks/useMediaQuery";

const DesktopMenu = ({ isAuth, onLogout, profile, visibleSearch }) => {
  const [isVisible, setVisible, tab, setTab] = useContext(UserLoginContext);
  const [searchText, setSearchText] = useState("");
  const history = useHistory();
  const isLargeDevice = useLargeDevice();

  const handleSignInClick = () => {
    // return history.push("/login");
    return history.push(routeURL.web.client_login());
  };

  return (
    <Row align="middle">
    {!isAuth && !isLargeDevice ? (
      <Col>
        <button
          className="signin-btn"
          style={{
            backgroundColor: "#eeeeee",
            color: "#000",
              marginRight: 8,
              fontSize: "16px",
              padding: "10px 14px",
              cursor: "pointer",
              border: "none",
            }}
            onClick={handleSignInClick}
          >
            Sign in
          </button>
        </Col>
      ) : null}

      <Col>
        <Cart />
      </Col>
    </Row>
  );
};

export default DesktopMenu;
