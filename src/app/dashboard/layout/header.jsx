import { Layout, Tag } from "antd";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AppContext, LOGOUT_USER } from "context";
import { Profile } from "app/dashboard/components";
import { JwtService } from "services/jwtService";
import { Row, Button, Col } from "antd";
import routeURL from "config/routeURL";
import { SearchOutlined, BellFilled } from "@ant-design/icons";
import { canIAccess } from "config/role";
import CanI from "app/dashboard/components/canI";
import OrderNotification from "../components/notification/OrderNotification";
import api from "../api";

const { Header } = Layout;
const AppHeader = ({ children, ...props }) => {
  const { appDispatch } = useContext(AppContext);

  const onLogout = () => {
    JwtService.logout();
    appDispatch({ type: LOGOUT_USER });
  };

  const [notificationVisible, setNotificationVisible] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
  const [order, setOrder] = useState([]);
  const [audio, setAudio] = useState(null);
  const [playCount, setPlayCount] = useState(0);

  const role = JwtService.getUserRole();

  const handleClick = () => {
    setOrderCount(0);
    setNotificationVisible(false);
  };
  const handleOrderClick = (id) => {
    api.orderNotification.read(id, true).then(() => {
      setNotificationVisible(false);
    });
  };

  useEffect(() => {
    const loadAudio = async () => {
      const notificationSound = new Audio(
        "https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"
      );
      notificationSound.load();
      setAudio(notificationSound);
    };

    loadAudio();
  }, []);

  useEffect(() => {
    if (orderCount > 0) {
      console.log("hello");
      audio && audio.play();
    }
  }, [orderCount, audio, playCount]);

  useEffect(() => {
    api.order.allPendingOrder().then(({ data }) => {
      const filteredData = data.filter(
        (item) => item.notificationSeen === false
      );
      console.log("filteredData", filteredData.length);
      setOrder(filteredData);
      setOrderCount(filteredData.length);
    });
    let isMounted = true;

    const intervalId = setInterval(() => {
      console.log("Testing");
      api.order.allPendingOrder().then(({ data }) => {
        const filteredData = data.filter(
          (item) => item.notificationSeen === false
        );
        console.log("filteredData", filteredData.length);
        setOrder(filteredData);
        setOrderCount(filteredData.length);
      });
    }, 10000);
    return () => {
      clearInterval(intervalId);
      isMounted = false;
    };
  }, [orderCount, notificationVisible]);

  return (
    <Header
      className="site-layout-background"
      style={{
        backgroundColor: "#fff",
      }}
    >
      {children}

      {console.log("role", role)}

      {notificationVisible && (
        <OrderNotification
          setOrderCount={setOrderCount}
          setNotificationVisible={setNotificationVisible}
          order={order}
          handleClick={handleClick}
          handleOrderClick={handleOrderClick}
          orderCount={orderCount}
        />
      )}

      <div style={{ display: "inline-block", float: "right" }}>
        <Row gutter={8}>
          <Col>
            <Link target="_blank" to={routeURL.web.home()}>
              <Button type="primary" shape="round">
                Open App
              </Button>
            </Link>
          </Col>
          <CanI access={"searchRider"}>
            <Col>
              <Link to={routeURL.cms.search_rider()}>
                <Button icon={<SearchOutlined />} type="primary" shape="round">
                  Rider
                </Button>
              </Link>
            </Col>
          </CanI>
          <Col>
            <Profile
              {...props}
              style={{ marginLeft: "30px" }}
              onLogout={onLogout}
            />
          </Col>
          <Col
            style={{
              marginLeft: "10px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => setNotificationVisible(!notificationVisible)}
          >
            <span
            // onClick={() => {
            //   setCartVisible(!cartVisible);
            // }}
            >
              <BellFilled
                style={{
                  fontSize: 22,
                  color: "#1890ff",
                }}
              />{" "}
              <Tag
                color="red"
                style={{
                  marginLeft: -15,
                  verticalAlign: "10px",
                  fontSize: "14px",
                  border: "none",
                  backgroundColor: "transparent",
                  fontWeight: "bolder",
                  //   borderRadius: '50%',
                  padding: "0px 0px !important",
                  //   marginTop: '10px'
                  //   textAlign: 'center',
                }}
              >
                {orderCount}
              </Tag>
            </span>
            {/* <div>
              <BellFilled style={{ color: "#1890ff", fontSize: 20 }} />
              <div style={{ backgroundColor: "red"}}>1</div>
            </div> */}
          </Col>
        </Row>
      </div>
    </Header>
  );
};

export default AppHeader;
