// React and library imports
import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useHistory, useRouteMatch } from "react-router-dom";
import throttle from "lodash.throttle";
import { Row, Col } from "antd";

// Other imports
import styles from "./index.module.css";
import logoImage from "image/logo.png";
import routeURL from "config/routeURL";
import { LOGOUT_USER_CLIENT, UserContext } from "context";
import api from "app/web/api";
import { handleError } from "services/util";
import { JwtService } from "services/jwtServiceClient";
import { useIsMobile, useIsTablet, useMidDevice } from "hooks/useMediaQuery";
import { RegionsContext } from "context";

// Custom components import
import SideMenu from "../SideMenu";
import DesktopMenu from "../DesktopMenu";
import SearchBar from "./SearchBar/SearchBar";
import Drawer from "./Drawer/SideDrawer";
import OrderTypes from "../../OrderTypes";
import RegionSelect from "./RegionSelect";

function NavigationHeader(props) {
  const isMobileDevice = useIsMobile();
  const isTablet = useIsTablet();
  const isMid = useMidDevice();
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);

  const location = useLocation();
  const history = useHistory();
  const { clientStore, clientDispatch } = useContext(UserContext);
  const [spinningProfile, setSpinningProfile] = useState(false);
  const { currentRegionID } = useContext(RegionsContext);
  const [profile, setProfile] = useState(null);
  const urlMatch = useRouteMatch("/search/");

  const isAuth = clientStore.isAuthenticated;

  // authentication
  useEffect(() => {
    // console.log("here before ");
    if (isAuth === undefined) return;
    if (isAuth) {
      setSpinningProfile(true);
      // console.log("here after ");
      api.client
        .me()
        .then(({ data }) => {
          setProfile(data);
          // redirect to the profile
          // console.log("profileee", profile.name);
          if (profile && !profile?.name) {
            if (location.pathname !== routeURL.web.my_account("accountDetail"))
              history.push(routeURL.web.my_account("accountDetail"));
          }
        })
        .catch(handleError)
        .finally(() => {
          setSpinningProfile(false);
        });
    } else {
      setProfile(null);
    }
  }, [isAuth]);

  // getting scroll position
  useEffect(() => {
    const handleScroll = throttle((_) => {
      const currentScrollPos = document.body.scrollTop;
      const currentScreenHeight = window.screen.height;

      // paint the header white
      if (currentScrollPos === 0) setHeaderVisible(false);
      else setHeaderVisible(true);

      // true if we scrolled half the window height
      if (currentScrollPos > Math.floor(currentScreenHeight / 2))
        setSearchBarVisible(true);
      else setSearchBarVisible(false);
    }, 200);

    if (window) window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // are we in home page
  useEffect(() => {
    const path = props.location.pathname;
    setIsHomePage(path === routeURL.web.home());
  }, [props.location.pathname]);

  const onLogout = () => {
    JwtService.logout();
    clientDispatch({ type: LOGOUT_USER_CLIENT });
    history.push(routeURL.web.home());
  };

  const showSearchBar = searchBarVisible || currentRegionID;

  return (
    <header
      className={`${styles.header} ${
        headerVisible ? styles.headerVisible : ""
      }`}
    >
      {/* ----------Drawer---------- */}
      <Drawer isMobileDevice={isMobileDevice} />
      <Row
        align="middle"
        justify="space-between"
        style={{ marginLeft: "30px", marginRight: "40px" }}
      >
        {/* ----------navbar-left---------- */}
        <Col flex={1}>
          <Row align="middle">
            <Col>
              <SideMenu isAuth={isAuth} onLogout={onLogout} profile={profile} />
            </Col>
            {/* ----------navbar-brand---------- */}
            <Col>
              <Link to={routeURL.web.home()}>
                <div
                  className={styles.navbarBrand}
                  style={{ margin: "0 20px" }}
                >
                  <div>
                    <img src={logoImage} alt={"logo RaraFoods rara foods"} />
                  </div>
                  {!currentRegionID && (
                    <div style={{ marginLeft: "16px" }}>
                      {process.env.REACT_APP_CMS_TITLE}
                    </div>
                  )}
                </div>
              </Link>
            </Col>

            {/* ----------current-region---------- */}
            {currentRegionID && !isTablet && (
              <Col>
                <RegionSelect />
              </Col>
            )}

            {/* ----------ordertypes---------- */}
            {currentRegionID && (isHomePage || urlMatch) && !isMid && (
              <Col style={{ marginRight: "12px" }}>
                <OrderTypes />
              </Col>
            )}

            {/* ----------searchbar---------- */}
            {showSearchBar && (
              <Col xs={14} md={14} lg={10}>
                <SearchBar isMobileDevice={isMobileDevice} />
              </Col>
            )}
          </Row>
        </Col>

        {/* ----------navbar-right---------- */}
        {!isMobileDevice && (
          <Col style={{ marginLeft: "20px" }}>
            <Row justify="end">
              <Col>
                <DesktopMenu
                  isAuth={isAuth}
                  onLogout={onLogout}
                  profile={profile}
                />
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </header>
  );
}

export default NavigationHeader;
