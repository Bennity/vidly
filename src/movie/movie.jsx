import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";

class movie extends Component {
  fetchData = () => {
    let fetchedData = [];
    Object.values(getMovies()).map((obj, index) => {
      fetchedData.push(
        <tr key={"movieRow_" + index}>
          <td>{obj.title}</td>
          <td>{obj.genre.name}</td>
          <td>{obj.numberInStock}</td>
          <td>{obj.dailyRentalRate}</td>
          <td>
            <button
              onClick={() => this.props.onDelete(obj._id)}
              type="button"
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
          <td onClick={() => this.props.onFavMovie(obj._id)}>
            <i className="fa fa-heart" aria-hidden={this.props.onFilled}></i>
          </td>
        </tr>
      );
    });

    return fetchedData;
  };

  render() {
    return this.fetchData();
  }
}

export default movie;
