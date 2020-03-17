import React from "react";
import _ from "lodash";

const pagination = props => {
  const pagesCount = props.itemsCount / props.pageSize;
  const pages = _.range(1, pagesCount + 1);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className="page-item"
            onClick={() => props.onPageChange(page)}
          >
            {page}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default pagination;
