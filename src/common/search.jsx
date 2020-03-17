import React from "react";

const search = props => {
  return (
    <input
      class="form-control"
      type="text"
      placeholder="Search"
      aria-label="Search"
      onChange={props.onSearch}
    />
  );
};

export default search;
