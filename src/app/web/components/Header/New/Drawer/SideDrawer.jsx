import React, { useState, useEffect } from "react";
import { Col, Drawer, Row } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import logoImage from "image/logo.png";
import { NOT_INSTALL_APP } from "config";

import { AndroidLink, AppleLink } from "../../SideMenu";

function SideDrawer({ isMobileDevice }) {
  const [appInstall, setAppInstall] = useState(false);

  useEffect(() => {
    const decision = window.localStorage.getItem(NOT_INSTALL_APP);
    if (!decision) setAppInstall(isMobileDevice);
  }, [isMobileDevice]);

  return (
    <Drawer
      title={
        <Row style={{ width: "100%" }} justify="space-between" align="middle">
          <Col>Continue in app?</Col>
          <Col>
            <CloseOutlined
              onClick={() => {
                window.localStorage.setItem(NOT_INSTALL_APP, "yes");
                setAppInstall(false);
              }}
            />
          </Col>
        </Row>
      }
      placement="bottom"
      closable={false}
      onClose={() => setAppInstall(false)}
      open={appInstall}
      key="bottom"
    >
      <Row
        style={
          {
            // position: 'absolute',
            // bottom: 32,
          }
        }
      >
        <Row align="middle">
          <Col xs={6}>
            <img
              style={{
                marginRight: 8,
                marginLeft: 8,
                width: "100%",
                maxWidth: 150,
              }}
              src={logoImage}
              alt={"logo RaraFoods rara foods"}
            />
          </Col>

          <Col offset={2} xs={24 - 8}>
            <span
              style={{
                fontWeight: 600,
                fontSize: 16,
                paddingRight: 16,
              }}
            >
              Enjoy ordering with ease from our app
            </span>
          </Col>
        </Row>
        <Row
          justify="center"
          gutter={8}
          style={{
            marginTop: 16,
            width: "100%",
          }}
        >
          <Col>
            <AppleLink />
          </Col>
          <Col>
            <AndroidLink />
          </Col>
        </Row>
      </Row>
    </Drawer>
  );
}

export default SideDrawer;
