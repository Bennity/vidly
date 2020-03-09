import React, { Component } from "react";

class MovieDetails extends Component {
  handleSave = () => {
    // Navigate to /products
    this.props.history.replace("/products");
  };

  render() {
    return (
      <div>
        <h1>Movie Form - {this.props.match.params._id} </h1>
        <button onClick={this.handleSave}>Save</button>
      </div>
    );
  }
}

export default MovieDetails;
