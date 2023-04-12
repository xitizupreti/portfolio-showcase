import React, { useState } from "react";
import { Col, Drawer, Row } from "antd";

function SideDrawer() {
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
      visible={appInstall}
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
              There's more to love in the app.
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

export default Drawer;
