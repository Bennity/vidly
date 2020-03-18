import React from "react";

const search = props => {
  return (
    <input
      className="form-control"
      type="text"
      placeholder="Search"
      aria-label="Search"
      onChange={props.onSearch}
    />
  );
};

export default search;
