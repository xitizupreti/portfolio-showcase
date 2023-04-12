import React from "react";
import { Link } from "react-router-dom";
import { CalendarOutlined } from "@ant-design/icons";

import classes from "./BlogCard.module.css";
import routeURL from "config/routeURL";

const BlogCard = (props) => {
  return (
    <div className={classes.container}>
      <article className={classes.imageContainer}>
        <figure className={classes.image}>
          <Link to={routeURL.web.blog_detail(props.blog.id)}>
            <img src={props.blog.blogImage} alt="" />
          </Link>
        </figure>

        <div className={classes.blogInfo}>
          <small>
            [ {props.blog.blogTags}]
            <CalendarOutlined style={{ margin: "0px 4px 0px 8px" }} />
            {props.blog.blogDate}
          </small>
          <h3>
            <a href=".">{props.blog.blogTitle}</a>
          </h3>
          <p>{props.blog.blogContent}</p>
          <div className={classes.blogBottom}>
            <div className={classes.blogAvatar}>
              <div className={classes.thumbnail}>
                <img src={props.blog.avatar} alt="" />
              </div>
              <div>{props.blog.personName}</div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogCard;
