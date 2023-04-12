import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import { FacebookLogin, GoogleLogin } from "app/web/components/socialLogin";
import { JwtService } from "services/jwtServiceClient";
import { notificationSuccess } from "app/web/components/notification";
import { handleError } from "services/util";
import PropTypes from "prop-types";
import api from "app/web/api";

const LinkSocialMedia = ({ refreshProfile, profilee }) => {
  const [spinningProfile, setSpinningProfile] = useState(false);
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    api.client
      .me()
      .then((data) => {
        console.log("pro data: ", data);
        setProfile(data);
      })
      .catch(handleError)
      .finally(() => setSpinningProfile(false));
  }, [spinningProfile]);
  // if (!profile) return null;
  const onFacebookLink = (accessToken, userID) => {
    JwtService.linkFacebook(accessToken, userID)
      .then((message) => {
        refreshProfile();
        notificationSuccess(message);
      })
      .catch(handleError);
  };

  const onGoogleLink = (accessToken) => {
    JwtService.linkGoogle(accessToken)
      .then((message) => {
        refreshProfile();
        notificationSuccess(message);
      })
      .catch(handleError);
  };

  const unlinkGoogle = () => {
    setSpinningProfile(true);
    api.auth
      .unlink({
        socialType: "google",
        email: profile.email,
      })
      .then(({ data }) => console.log(data))
      .catch(handleError)
      .finally(() => setSpinningProfile(false));
  };

  const unlinkFacebook = () => {
    setSpinningProfile(true);
    api.auth
      .unlink({
        socialType: "facebook",
        // email: profile.email,
      })
      .then(({ data }) => console.log(data))
      .catch(handleError)
      .finally(() => setSpinningProfile(false));
  };

return (
  <div>
    <div
      className="my-account-address account-wrapper"
      style={{
        width: "100%",
      }}
    >
      <h4
        className="account-title"
        onClick={() => console.log(profile)}
        style={{ marginBottom: "20px" }}
      >
          Link Social Media to your Account
        </h4>
        {console.log('user', profilee && profilee.isFacebookLinked)}
        <Row gutter={32} align="middle">
          <Col>
            {profilee && profilee.isFacebookLinked ? (
              <span
                style={{
                  width: "auto",
                  height: 40,
                  boxShadow: "",
                }}
            >
              Facebook Linked{" "}
              <i
                className="far fa-check-circle"
                style={{
                  color: "#76ff03",
                }}
                />
              </span>
            ) : (
              <FacebookLogin onSuccess={onFacebookLink} text="Link" />
            )}
          </Col>
          <Col>
            {profilee && profilee.isGoogleLinked ? (
              <span
                style={{
                  width: "auto",
                  height: 40,
                  boxShadow: "",
                }}
            >
              Google Linked{" "}
              <i
                className="far fa-check-circle"
                style={{
                  color: "#76ff03",
                }}
                />
              </span>
            ) : (
              <GoogleLogin onSuccess={onGoogleLink} text="Link" />
            )}
          </Col>
          <Col>
            {profilee && profilee.isFacebookLinked ? (
              <span
                style={{
                  width: "auto",
                  height: 40,
                  boxShadow: "",
                  cursor: "pointer",
                }}
              onClick={unlinkFacebook}
            >
              Unlink Facebook{" "}
              <i className="fas fa-times-circle" style={{ color: "#76ff03" }}></i>
            </span>
          ) : null}
        </Col>
          <Col>
            {profilee && profilee.isGoogleLinked ? (
              <span
                style={{
                  width: "auto",
                  height: 40,
                  boxShadow: "",
                  cursor: "pointer",
                }}
              onClick={unlinkGoogle}
            >
              Unlink Google{" "}
              <i className="fas fa-times-circle" style={{ color: "#76ff03" }}></i>
            </span>
          ) : null}
        </Col>
        </Row>
      </div>
    </div>
  );
};

LinkSocialMedia.propTypes = {
  profile: PropTypes.object,
  refreshProfile: PropTypes.func,
};

export default LinkSocialMedia;
