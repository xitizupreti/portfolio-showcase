import React, { useState, useEffect } from "react";
import api from "app/web/api";
import { Layout, Row, Divider, Col } from "antd";
import { handleError } from "services/util";
import config from "config";
import defaultImg from "image/foods/17.png";
import { default as useBreakpoint } from "services/Breakpoint";
import {
  FolderOutlined,
  CalendarOutlined,
  EditOutlined,
} from "@ant-design/icons";
import moment from "moment";
import DOMPurify from "dompurify";
import { Link, useHistory, withRouter } from "react-router-dom";
import routeURL from "config/routeURL";
import "./index.css";

const { Header, Footer, Sider, Content } = Layout;

function BlogDetail(props) {
  const history = useHistory();
  const point = useBreakpoint();
  const isMobileDevice = () => ["xs", "sm"].includes(point);
  const {
    match: {
      params: { itemId },
    },
  } = props;
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [blogDetail, setBlogDetail] = useState(null);
  const [spinning, setSpinning] = useState(false);
  useEffect(() => {
    if (itemId) setSpinning(true);
    api.blog
      .read(itemId)
      .then(({ data }) => setBlogDetail(data))
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, []);
  useEffect(() => {
    setSpinning(true);
    api.blog
      .read_active()
      .then(({ data }) => {
        // console.log('blogs', data);
        setLatestBlogs(data);
      })
      .catch(handleError)
      .finally(() => setSpinning(false));
  }, []);
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  return (
    <div>
      <Layout
        style={{
          margin: isMobileDevice()
            ? "100px 20px 30px 20px"
            : "100px 80px 30px 80px",
        }}
      >
        <Content>
          <div>
            <img
              className="blog-detail-img"
              alt="example"
              src={
                blogDetail && blogDetail.images.length > 0
                  ? config.getImageHost(blogDetail.images[0])
                  : defaultImg
              }
            />
            <div style={{ padding: "30px" }}>
              <h5>{blogDetail && blogDetail.title}</h5>
              <Row>
                <div style={{ marginRight: "20px" }}>
                  {" "}
                  <FolderOutlined style={{ marginRight: "3px" }} />
                  {blogDetail && blogDetail.category}
                </div>
                <div style={{ marginRight: "20px" }}>
                  {" "}
                  <CalendarOutlined style={{ marginRight: "3px" }} />
                  {blogDetail &&
                    moment(blogDetail.createdDateTime).format("LL")}
                </div>
                <div style={{ marginRight: "20px" }}>
                  {" "}
                  <EditOutlined style={{ marginRight: "3px" }} />{" "}
                  {blogDetail && blogDetail.author}
                </div>
              </Row>
              <div style={{ marginTop: "20px" }}>
                <p
                  style={{ color: "#000" }}
                  dangerouslySetInnerHTML={createMarkup(
                    blogDetail && blogDetail.description
                  )}
                ></p>
              </div>
            </div>
          </div>
        </Content>
        {!isMobileDevice() ? (
          <Sider
            width={400}
            theme="light"
            style={{ padding: "0px 20px 20px 20px" }}
          >
            <Row>
              <h5>Latest Post</h5>
              {/* {console.log("latest Blogs", blogs.slice(-2))} */}
            </Row>
            <Divider />
            {latestBlogs.slice(-4).map((blog, index) => {
              console.log("latest", blog);
              return (
                <Link to={routeURL.web.blog_detail(blog?._id)}>
                  <Row
                    style={{ marginBottom: "15px", cursor: "pointer" }}
                    onClick={() => {
                      // history.push(routeURL.web.blog_detail(blog._id));
                    }}
                  >
                    <img
                      width={80}
                      height={80}
                      style={{ objectFit: "cover", borderRadius: "10px" }}
                      alt={blog._id}
                      src={
                        blog.images.length > 0
                          ? config.getImageHost(blog.images[0])
                          : defaultImg
                      }
                    />
                    <Col style={{ marginLeft: "8px" }}>
                      <p>{blog.category}</p>
                      <h6 style={{ marginTop: "4px", padding: "0 !important" }}>
                        {blog.title}
                      </h6>
                    </Col>
                  </Row>
                </Link>
              );
            })}
          </Sider>
        ) : null}
      </Layout>
      {isMobileDevice() ? (
        <div style={{ padding: "20px" }}>
          <Row>
            <h5>Latest Post</h5>
          </Row>
          <Divider />
          {latestBlogs.slice(-2).map((blog, index) => {
            console.log("latest", blog);
            return (
              <Row style={{ marginBottom: "15px" }}>
                <img
                  width={80}
                  height={80}
                  style={{ objectFit: "cover", borderRadius: "10px" }}
                  src={
                    blog.images.length > 0
                      ? config.getImageHost(blog.images[0])
                      : defaultImg
                  }
                />
                <Col style={{ marginLeft: "8px" }}>
                  <p>Category</p>
                  <h6 style={{ marginTop: "4px", padding: "0 !important" }}>
                    {blog.title}
                  </h6>
                </Col>
              </Row>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default withRouter(BlogDetail);
