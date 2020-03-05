import React, { Component } from "react";
import { getMovies } from "./../services/fakeMovieService";

class movies extends Component {
  fetchMovies = () => {
    let moviewithliked = [];
    getMovies().map(obj => {
      return moviewithliked.push(Object.assign(obj, { liked: "false" }));
    });
    return moviewithliked;
  };

  state = {
    movies: this.fetchMovies()
  };

  handleDelete = id => {
    const movies = this.state.movies.filter(obj => obj.id !== id);
    console.log(movies, id);
    this.setState({ movies });
  };

  favmovies = id => {
    return this.state.movies.map(obj => {
      if (id === obj.id) {
        console.log(obj);
        return (obj.filled = "true");
      }
    });
  };

  renderMovies = () => {
    let renderedMovies = [];
    this.fetchMovies().map((obj, index) => {
      return renderedMovies.push(
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
          <td onClick={() => this.favmovies(obj._id)}>
            <i
              className="fa fa-heart"
              aria-hidden={this.state.movies.liked}
            ></i>
          </td>
        </tr>
      );
    });
    return renderedMovies;
  };

  render() {
    return (
      <React.Fragment>
        <p>Showing {this.state.movies.length} movies in the Database.</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
            </tr>
          </thead>
          <tbody>{this.renderMovies()}</tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default movies;
