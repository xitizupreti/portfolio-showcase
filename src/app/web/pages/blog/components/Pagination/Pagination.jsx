import React, { useState } from "react";
import ReactPaginate from "react-paginate";

import BlogCard from "../BlogCard/BlogCard";
import classes from "./Pagination.module.css";

const Pagination = ({ blogs, isSpinning }) => {
  const [pageNumber, setPageNumber] = useState(0);

  const blogsPerPage = 6;
  const pagesVisited = pageNumber * blogsPerPage;
  const blogSegment = blogs.slice(pagesVisited, pagesVisited + blogsPerPage);

  const blogCard = blogSegment.map((blog, i) => {
    return <BlogCard blog={blog} key={i} />;
  });

  const pageCount = Math.ceil(blogs.length / blogsPerPage);

  return (
    <div className={classes.container}>
      <div className={classes.blogCards}>{blogCard}</div>
      <ReactPaginate
        previousLabel={"«"}
        nextLabel={"»"}
        breakLabel={"..."}
        pageCount={pageCount}
        onPageChange={(page) => setPageNumber(page.selected)}
        containerClassName={classes.paginationBtn}
        previousLinkClassName={classes.previousBtn}
        nextLinkClassName={classes.nextBtn}
        disabledClassName={classes.disabledBtn}
        activeClassName={classes.activeBtn}
      />
    </div>
  );
};

export default Pagination;
