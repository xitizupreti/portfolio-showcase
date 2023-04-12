import { Col, Row, Slider, Form, Button, Spin } from "antd";
import { useLocation, useHistory } from "react-router-dom";
import * as QueryString from "query-string";

import routeURL from "config/routeURL";

import apiCMS from "app/dashboard/api";
import { useEffect, useState } from "react";
import { handleError } from "services/util";
import { POPULARITY_MAP } from ".";

export default function SearchOption() {
  const [dietaryplans, setDietaryPlans] = useState([]);
  const history = useHistory();
  const search = useLocation().search;
  const urlSearchParams = new URLSearchParams(search);
  const urlPms = QueryString.parse(search);
  const currentDietary = urlSearchParams.get("dietary");
  const currentPopularity = urlSearchParams.get("popularity");
  const currentPrice = urlSearchParams.get("price");
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    setIsSpinning(true);
    setIsSpinning();
    apiCMS.dietary_plan
      .readAll()
      .then(({ data }) => {
        setDietaryPlans(data);
      })
      .catch(handleError)
      .finally(setIsSpinning(false));
  }, []);

  const mergeQuery = (query, extra) => {
    const paramsQuery = {
      ...query,
      ...extra,
    };
    const allkeys = Object.keys(paramsQuery);
    if (allkeys.length === 0) return "";
    const qString = allkeys
      .map((each) => each !== "none" && `${each}=${paramsQuery[each]}`)
      .filter((each) => !!each)
      .join("&");
    return qString;
  };

  const onSearch = (key, value) => {
    history.push(
      routeURL.params(
        routeURL.web.search(),
        mergeQuery(urlPms, { [key]: value })
      )
    );
  };

  const clickSelectHandler = (selection, option) => {
    if (selection === "dietary") {
      if (option === currentDietary) {
        onSearch(selection, "");
        return;
      }
      onSearch(selection, option);
    } else if (selection === "popularity") {
      if (option === currentPopularity) {
        onSearch(selection, "");
        return;
      }
      onSearch(selection, option);
    }
  };

  return (
    <Form layout="vertical">
      <Row>
        <Col xs={24}>
          <Form.Item
            label="Max. Price"
            style={{
              padding: "0px",
              marginBottom: 0,
            }}
          >
            <Slider
              onChange={(value) => onSearch("price", parseInt(value / 33) + 1)}
              tooltipVisible={false}
              step={33}
              defaultValue={Math.ceil(currentPrice - 1) * 33.33 || 100}
              marks={{
                0: "$",
                33: "$$",
                66: "$$$",
                100: {
                  label: <strong>$$$$</strong>,
                },
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <Form.Item
            style={{
              margin: "2em 0",
            }}
            label="Dietary"
          >
            {isSpinning ? (
              <Spin />
            ) : (
              dietaryplans.map((plan, index) => (
                <Button
                  key={index}
                  onClick={() => clickSelectHandler("dietary", plan.name)}
                  style={{ margin: "0px 6px 6px 0", borderRadius: "30px" }}
                  type={plan.name === currentDietary ? "primary" : ""}
                >
                  {plan.name}
                </Button>
              ))
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <Form.Item
            style={{
              marginBottom: 0,
              // marginTop: "15px",
            }}
            label="Popularity"
          >
            {Object.keys(POPULARITY_MAP).map((popularity, index) => (
              <Button
                key={index}
                onClick={() =>
                  clickSelectHandler("popularity", POPULARITY_MAP[popularity])
                }
                style={{ margin: "0 6px 6px 0", borderRadius: "30px" }}
                type={
                  POPULARITY_MAP[popularity] === currentPopularity
                    ? "primary"
                    : ""
                }
              >
                {popularity}
              </Button>
            ))}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
