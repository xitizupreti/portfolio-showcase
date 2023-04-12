import React, { useState, useEffect, useContext } from "react";
import { Modal, Divider, Spin, Row, Col, AutoComplete } from "antd";

import styles from "./index.module.css";
import { RegionsContext } from "context/regionsContext";

const initialSelect = {
  name: "",
  id: null,
};

function RegionSelect() {
  const [regionInput, setRegionInput] = useState("");
  const [isRegionModalVisible, setIsRegionModalVisible] = useState(false);
  const [regionOptions, setRegionOptions] = useState([]);
  const [regionName, setRegionName] = useState("");
  const [isChanging, setIsChanging] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(initialSelect);

  const { regions, changeCurrentRegion, currentRegionID, getRegionNameByID } =
    useContext(RegionsContext);

  useEffect(() => {
    setRegionName(getRegionNameByID(currentRegionID));
  }, [currentRegionID, getRegionNameByID]);

  const RegionClickHandler = () => {
    setIsRegionModalVisible(true);
  };

  const regionCancelHandler = () => {
    if (isChanging) setIsChanging(false);
    else setIsRegionModalVisible(false);
    setRegionInput("");
    setSelectedRegion(initialSelect);
  };

  const regionChangeHandler = (data) => {
    setRegionInput(data);
  };

  const regionSearchHandler = (searchText) => {
    // array of matched regions by searchText
    const filteredRegions = regions.filter((region) => {
      return !!region.name.toLowerCase().match(searchText.toLowerCase());
    });

    // if filteredRegions has >=4 element then get 4 else all the array
    const n = filteredRegions.length >= 4 ? 4 : filteredRegions.length;
    const mappedRegions = filteredRegions.slice(0, n).map((region) => {
      return { value: region.name, id: region._id };
    });
    setRegionOptions(mappedRegions);
  };

  const regionSelectHandler = (data) => {
    // get regionID from the options
    const regionID = regionOptions.filter((r) => r.value === data)[0].id;
    // set currently selected region
    setSelectedRegion({ name: data, id: regionID });
    // go back to the first screen
    setIsChanging(false);
    setRegionInput("");
  };

  const regionOkHandler = () => {
    // are we on the input screen?
    if (!isChanging) {
      // if select any region change region
      if (selectedRegion.id) changeCurrentRegion(selectedRegion.id);
      setIsRegionModalVisible(false);
      setSelectedRegion(initialSelect);
    }
    setRegionInput("");
  };

  return (
    <>
      <Modal
        visible={isRegionModalVisible}
        onOk={regionOkHandler}
        onCancel={regionCancelHandler}
        footer={null}
      >
        <Row
          justify="center"
          align="middle"
          style={{ padding: "20px 0px 0 0px" }}
        >
          <Col style={{ marginBottom: "20px" }}>
            <h3>Delivery Region</h3>
            <Divider />
          </Col>
          <Col span={24}>
            <Row
              align="middle"
              justify="center"
              style={{
                padding: "30px 30px 0px 30px",
              }}
            >
              <Col span={24}>
                {isChanging ? (
                  <>
                    <AutoComplete
                      value={regionInput}
                      options={regionOptions}
                      onSelect={regionSelectHandler}
                      style={{ width: "100%" }}
                      onChange={regionChangeHandler}
                    onSearch={regionSearchHandler}
                  >
                    <input
                      className={styles.regionInput}
                      type="text"
                      placeholder="Enter Region"
                    />
                    </AutoComplete>
                  </>
                ) : (
                  <>
                  <Row align="middle" justify="center">
                    <Col
                      span={24}
                      className={styles.currentSelectedRegion}
                      style={{ display: "flex" }}
                    >
                      <span>
                        <i class="fas fa-map-marker-alt"></i>
                        {selectedRegion.name ? (
                          selectedRegion.name
                        ) : regionName ? (
                            regionName
                          ) : (
                            <Spin />
                        )}
                      </span>
                      <button
                        className={styles.currentRegionButton}
                        onClick={() => setIsChanging(true)}
                      >
                        change
                        </button>
                      </Col>
                    </Row>
                  <Row justify="end" align="middle">
                    <Col span={"auto"}>
                      <button
                        className={styles.regionOkButton}
                        onClick={regionOkHandler}
                      >
                        ok
                        </button>
                      </Col>
                    </Row>
                  </>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
      {/* ----------region-select button---------- */}
    <Row>
      <Col>
        <button
          className={styles.currentRegionButton}
          onClick={RegionClickHandler}
        >
          <i class="fas fa-map-marker-alt"></i>
          <span style={{ marginLeft: "10px", marginRight: "2px" }}>
            {regionName ? regionName : <Spin />}
          </span>
          </button>
        </Col>
      </Row>
    </>
  );
}

export default RegionSelect;
