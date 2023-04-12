import React, { useState } from "react";
import { Row, Card } from "antd";

import logoImage from "image/logo.png";

import RestaurantByLocation from "../RestaurantByLocation";
import PromoteBusiness from "app/web/pages/home/PromoteBusiness";
import { AndroidLink, AppleLink } from "app/web/components/Header/SideMenu";
import HeroSection from "../HeroSection";

function LandingPage() {
  return (
    <>
      <HeroSection />
      <Row
        align="middle"
        style={{
          marginTop: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          style={{
            borderRadius: "10px",
            border: "none",
            width: "500px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <img
                style={{
                  marginRight: 8,
                  marginLeft: 8,
                  width: "80px",
                }}
                src={logoImage}
                alt={"logo RaraFoods rara foods"}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div>
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                    paddingRight: 8,
                  }}
                >
                  Enjoy ordering with ease from our app
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AppleLink />
                <AndroidLink />
              </div>
            </div>
          </div>
        </Card>
      </Row>

      <PromoteBusiness />
      <RestaurantByLocation />
      <hr />
    </>
  );
}

export default LandingPage;
