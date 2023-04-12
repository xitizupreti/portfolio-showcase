import { useContext } from "react";
import { LATITUDE, LONGITUDE } from "config";

import "../../layout/style.css";
import "./index.css";
import { RegionsContext } from "context";

import LandingPage from "./LandingPage";
import Feed from "./Feed";

function HomePage({ coords, location }) {
  // TODO: if regionID set then we show region sepcific page
  const { currentRegionID } = useContext(RegionsContext);

  if (coords) {
    window.localStorage.setItem(LATITUDE, coords.latitude);
    window.localStorage.setItem(LONGITUDE, coords.longitude);
  }

  if (currentRegionID) {
    return <Feed />;
  } else {
    return <LandingPage />;
  }
}

export default HomePage;
