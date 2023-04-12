import routeURL from "config/routeURL";
import React from "react";
import { Link } from "react-router-dom";
import { CalendarOutlined } from "@ant-design/icons";

import classes from "./LatestPost.module.css";

const LatestPost = (props) => {
  const latestPosts = props.blogs.slice(0, 4).map((blog, index) => (
    <li key={index}>
      <div className={classes.thum}>
        <Link to={routeURL.web.blog_detail(blog.id)}>
          <img src={blog.blogImage} alt="" />
        </Link>
      </div>
      <div className={classes.blogDetails}>
        <small>
          [ {blog.blogTags}]
          <CalendarOutlined style={{ margin: "0px 4px 0px 8px" }} />
          {blog.blogDate}
        </small>
        <h3>
          <Link to={routeURL.web.blog_detail(blog.id)}>{blog.blogTitle}</Link>
        </h3>
      </div>
    </li>
  ));
  return <ul className={classes.LatestPostCard}>{latestPosts}</ul>;
};

export default LatestPost;
