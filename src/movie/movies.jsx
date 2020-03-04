import React, { Component } from "react";
import Movie from "./movie";

class movies extends Component {
  state = {
    movies: Movie,
    movielength: Object.keys(getMovies()).length,
    filled: "false"
  };

  handleDelete = movie => {
    this.setState(deleteMovie(movie));
    this.setState({ movielength: Object.keys(getMovies()).length });
  };

  favmovies = _id => {
    let filled = this.state.filled;
    filled = "true";
    console.log(filled, _id);
    return this.setState({ filled });
  };

  render() {
    return (
      <React.Fragment>
        <p>Showing {this.state.movielength} movies in the Database.</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
            </tr>
          </thead>
          <tbody>
            <Movie
              onDelete={this.handleDelete}
              onFavMovie={this.favmovies}
              onFilled={this.filled}
            />
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default movies;
