import React, { Component } from "react";

class search extends Component {
  render() {
    return (
      <input
        class="form-control"
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={this.props.onSearch}
      />
    );
  }
}

export default search;
