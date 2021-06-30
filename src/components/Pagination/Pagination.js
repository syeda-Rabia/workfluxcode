import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import "./Pagination.scss";
import { Button } from "@material-ui/core";

const Pagination = (props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <div className="">
      <Button
        onClick={() => {
          const page = currentPage - 1;
          if (page > 0) {
            onPageChange(page);
          }
        }}
      >
        <span>Prev</span>
      </Button>
      {pages.map((page) => (
        <Button
          key={page}
          color={page === currentPage ? "primary" : ""}
          variant={page === currentPage ? "contained" : ""}
          onClick={() => onPageChange(page)}
        >
          <span>{page}</span>
        </Button>
      ))}
      <Button
        onClick={() => {
          const page = currentPage + 1;
          if (page <= pages.length) {
            onPageChange(page);
          }
        }}
      >
        <span>Next</span>
      </Button>
    </div>
  );
};
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
