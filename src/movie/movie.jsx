import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";

class movie extends Component {
  state = {
    movies: getMovies(),
    movielength: Object.keys(getMovies()).length
  };

  handleDelete = movie => {
    this.setState(deleteMovie(movie));
    this.setState({ movielength: Object.keys(getMovies()).length });
  };

  fetchData = () => {
    let fetchedData = [];
    Object.values(this.state.movies).map((obj, index) => {
      fetchedData.push(
        <tr key={"movieRow_" + index}>
          <td>{obj.title}</td>
          <td>{obj.genre.name}</td>
          <td>{obj.numberInStock}</td>
          <td>{obj.dailyRentalRate}</td>
          <td>
            <button
              onClick={() => this.handleDelete(obj._id)}
              type="button"
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });

    return fetchedData;
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
          <tbody>{this.fetchData()}</tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default movie;
