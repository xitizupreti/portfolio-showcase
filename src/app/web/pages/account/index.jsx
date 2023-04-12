/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect, useState } from "react";
import bannerImage from "image/background.jpg";
import { Col, Row, Tabs } from "antd";
import Order from "./Order";
import ShippingAddress from "./ShippingAddress";
import Dashboard from "./Dashboard";
import AccountDetail from "./AccountDetail";
import "./index.css";
import UnAuthorized from "app/web/components/Error/UnAuthorized";
import { UserContext } from "context";
import Wishlist from "./Wishlist";
import api from "app/web/api";
import { notificationError } from "app/web/components/notification";
import { handleError } from "services/util";
import { Link, useLocation } from "react-router-dom";
import routeURL from "config/routeURL";
import { Helmet } from "react-helmet";
import LinkSocialMedia from "app/web/pages/account/LinkSocialMedia";
import BannerContainer from "app/web/components/Banner/Banner";

const pageTitle = "Account Details";

const Banner = ({ title }) => (
  <BannerContainer bannerText={title}>
    {/* <ol
      className="breadcrumb justify-content-center"
      style={{ marginTop: "150px" }}
    >
      <li className="breadcrumb-item">
        <Link to={routeURL.web.home()}>Home</Link>
      </li>
      <li className="breadcrumb-item active">My Account</li>
    </ol> */}
  </BannerContainer>
);

export default function Account(props) {
  const {
    match: {
      params: { tabValue },
    },
  } = props;
  const location = useLocation();
  var path = location.pathname;
  if (path == "/account/dashboard/order") {
    console.log("pathname", path);
  }

  // useEffect(() => {
  //   if (tabs.map((each) => each.key).includes(tabValue)) setActiveKey(tabValue);
  //   else setActiveKey(tabs[0].key);
  // }, [tabValue]);

  const { clientStore } = useContext(UserContext);
  const isAuth = clientStore.isAuthenticated;

  const [spinningProfile, setSpinningProfile] = useState(false);
  const [profile, setProfile] = useState(null);
  const refreshProfile = () => {
    setSpinningProfile(true);
    api.client
      .me()
      .then(({ data }) => setProfile(data))
      .catch(handleError)
      .finally(() => setSpinningProfile(false));
  };

  const tabs = [
    // {
    //   icon: 'fas fa-tachometer-alt',
    //   title: 'Dashboard',
    //   key: 'home',
    //   content: <Dashboard profile={profile} />,
    // },
    {
      icon: "fas fa-shopping-cart",
      title: "Order",
      key: "order",
      content: <Order />,
    },
    {
      icon: "fas fa-heart",
      title: "Wishlist",
      key: "wishlist",
      content: <Wishlist />,
      // content: <Dashboard profile={profile} />,
    },
    {
      icon: "fas fa-location-arrow",
      title: "Address",
      key: "shippingAddress",
      content: <ShippingAddress />,
    },
    // {
    //   icon: 'fas fa-users',
    //   title: 'Link Social Media',
    //   key: 'social_media',
    //   content: (
    //     <LinkSocialMedia profile={profile}  refreshProfile={refreshProfile}/>
    //   ),
    // },
    {
      icon: "fas fa-user",
      title: "Account Details",
      key: "accountDetail",
      content: (
        <AccountDetail profile={profile} refreshProfile={refreshProfile} />
      ),
    },
  ];
  const [activeKey, setActiveKey] = useState(tabs[0].key);
  const getTabName = (key) => tabs.find((tab) => tab.key === key).title;

  useEffect(() => {
    if (isAuth) {
      setSpinningProfile(true);
      api.client
        .me()
        .then(({ data }) => setProfile(data))
        .catch(handleError)
        .finally(() => setSpinningProfile(false));
    }
  }, [isAuth]);

  return isAuth === undefined ? null : isAuth ? (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {process.env.REACT_APP_CMS_TITLE} | {pageTitle}
        </title>
        <meta
          name="description"
          content={`${process.env.REACT_APP_CMS_TITLE} user account page`}
        />
      </Helmet>

      <Banner
        title={
          path == "/account/dashboard/order"
            ? "Order History"
            : path == "/account/dashboard/accountDetail"
            ? "My Account"
            : "WishList"
        }
      />
      <section
        className="my-account-page"
        style={{
          paddingTop: 50,
          paddingBottom: 80,
        }}
      >
        <div className="container">
          <div className="row">
            <div
              className="my-account-menu"
              style={{
                width: "100%",
                marginTop: 30,
              }}
            >
              {tabs.map(
                (tab, idx) =>
                  tab.key === tabValue && (
                    <Col xs={16} offset={4} key={idx}>
                      {tab.content}
                    </Col>
                  )
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  ) : (
    <UnAuthorized />
  );
}
