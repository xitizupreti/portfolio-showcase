// react and libraries
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AutoComplete } from "antd";

// other imports
import routeURL from "config/routeURL";
import styles from "./SearchBar.module.css";
import { RegionsContext } from "context/regionsContext";

function SearchBar({ showButton, style, isMobileDevice }) {
  const history = useHistory();
  const [searchText, setSearchText] = useState("");
  const [searchOptions, setSearchOptions] = useState([]);
  const { regions, currentRegionID, getRegionIDByName, changeCurrentRegion } =
    useContext(RegionsContext);

  const keyDownHandler = ({ key }) => {
    if (searchText && key === "Enter") {
      if (!currentRegionID) {
        changeCurrentRegion(getRegionIDByName(searchText.trim()));
      } else {
        history.push(
          routeURL.params(
            routeURL.web.search(),
            `q=${searchText.trim()}&search_by=restaurant`
          )
        );
      }

      setSearchText("");
    }
  };

  const onButtonClickHandler = async () => {
    if (!currentRegionID) {
      changeCurrentRegion(getRegionIDByName(searchText.trim()));
    } else {
      history.push(
        routeURL.params(
          routeURL.web.search(),
          `q=${searchText.trim()}&search_by=restaurant`
        )
      );
    }

    setSearchText("");
  };

  const onChangeHandler = (data) => {
    setSearchText(data);
  };

  const selectHandler = (data) => {
    setSearchText(data);
  };

  const searchHandler = (srchTxt) => {
    if (!currentRegionID) {
      // array of matched regions by searchText
      const filteredRegions = regions.filter((region) => {
        return !!region.name.toLowerCase().match(srchTxt.toLowerCase());
      });

      // if filteredRegions has >=4 element then get 4 else all the array
      const n = filteredRegions.length >= 4 ? 4 : filteredRegions.length;
      const mappedRegions = filteredRegions.slice(0, n).map((region) => {
        return { value: region.name, id: region._id };
      });
      setSearchOptions(mappedRegions);
    }
  };

  return (
    <div className={styles.searchBarContainer} style={{ ...style }}>
      {/* ----------search input---------- */}
      <div className={`${styles.searchBarInput}`}>
        <i class="fa fa-search" aria-hidden="true"></i>
        <AutoComplete
          value={searchText}
          options={searchOptions}
          onSelect={selectHandler}
          onChange={onChangeHandler}
          onSearch={searchHandler}
          style={{ width: "100%" }}
        >
          <input
            type="text"
            onKeyDown={keyDownHandler}
            className={styles.searchBarInputField}
            placeholder={
              !isMobileDevice
                ? currentRegionID
                  ? `Find Food/Restaurant`
                  : "Enter delivery address"
                : ""
            }
          />
        </AutoComplete>
      </div>
      {/* search button */}
      {showButton && (
        <button
          className={styles.searchBarButton}
          onClick={onButtonClickHandler}
        >
          Find Food
        </button>
      )}
    </div>
  );
}

export default SearchBar;
