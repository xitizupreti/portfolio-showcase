import { createContext, useState, useEffect, useCallback } from "react";
import Geocode from "react-geocode";

import { handleError } from "services/util";
import api from "app/web/api";
import { JwtService } from "services/jwtServiceClient";

const CURRENT_REGION = "Marrikville";

export const RegionsContext = createContext(null);

export const RegionsProvider = (props) => {
  const [regions, setRegions] = useState([]);
  const [currentRegionID, setCurrentRegionID] = useState(
    JwtService.getRegion()
  );

  useEffect(() => {
    const getRegionsByName = async (currentRegion) => {
      try {
        const { results } = await Geocode.fromAddress(currentRegion);
        const { lat, lng } = results[0].geometry.location;
        const regionByCoordinates = await api.region.readAll({
          latitude: lat,
          longitude: lng,
        });
        return regionByCoordinates.data;
      } catch (error) {
        handleError(error);
      }
    };

    getRegionsByName(CURRENT_REGION)
      .then((response) => {
        setRegions([...response]);
      })
      .catch(handleError);
  }, []);

  const getRegionIDByName = useCallback(
    (name) => {
      if (regions.length === 0) {
        return;
      }
      const foundRegion = regions.filter(
        (region) => region.name.toLowerCase() === name.toLowerCase()
      );
      return foundRegion[0]._id;
    },
    [regions]
  );

  const getRegionNameByID = useCallback(
    (ID) => {
      if (regions.length === 0) {
        return;
      }
      const foundRegion = regions.filter((r) => r._id === ID);
      return foundRegion[0].name;
    },
    [regions]
  );

  const changeCurrentRegion = (regionID) => {
    JwtService.assignRegion(regionID);
    setCurrentRegionID(regionID);
  };

  return (
    <RegionsContext.Provider
      value={{
        regions,
        currentRegionID,
        getRegionNameByID,
        getRegionIDByName,
        changeCurrentRegion,
      }}
    >
      {props.children}
    </RegionsContext.Provider>
  );
};
