import { useState, useEffect } from "react";
import Pagination from "./components/Pagination/Pagination";
import moment from "moment";

import avatar from "./assets/images/avatar.jpg";
import api from "app/web/api";
import { handleError } from "services/util";
import config from "config";
import defaultImg from "image/foods/17.png";

import classes from "./Blog.module.css";
import Aside from "./components/Aside/Aside";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    setIsSpinning(true);
    api.blog
      .read_active()
      .then(({ data }) => {
        const newData = data.map((blog) => {
          return {
            id: blog._id,
            blogImage:
              blog.images && blog.images.length > 0
                ? config.getImageHost(blog?.images[0])
                : defaultImg,
            blogDate: moment(blog.createdDateTime).format("ll"),
            blogTitle: blog.title,
            blogContent: blog.description,
            blogTags: blog.tags.reduce((acc, tag) => `${tag} ${acc}`, ""),
            personName: blog.author,
            avatar: avatar,
          };
        });
        setBlogs(newData);
      })
      .catch(handleError)
      .finally(() => setIsSpinning(false));
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.blogContainer}>
        <Pagination blogs={blogs} isSpinning={isSpinning} />
        <Aside blogs={blogs} isSpinning={isSpinning} />
      </div>
    </div>
  );
};

export default Blog;
