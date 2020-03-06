import React, { Component } from "react";
import { getMovies } from "./../services/fakeMovieService";
import Movie from "./movie";

class movies extends Component {
  fetchMovies = () => {
    let moviewithliked = [];
    getMovies().map(obj => {
      return moviewithliked.push(
        Object.assign(obj, { liked: "fa fa-heart-o" })
      );
    });
    return moviewithliked;
  };

  state = {
    movies: this.fetchMovies(),
    favmovies: {}
  };

  handleDelete = id => {
    const movies = this.state.movies.filter(obj => obj._id !== id);
    console.log(movies, id);
    this.setState({ movies });
  };

  favmovies = id => {
    const favmovie = this.state.movies.filter(obj => obj._id === id);
    this.fillheartwithliked(id);
    const favmovies = [...this.state.favmovies];
    favmovies.push(favmovie);
    this.setState({ favmovies });
  };

  fillheartwithliked = id => {
    const movies = [...this.state.movies];
    const movie = movies.filter(obj => obj._id === id);
    movie.map(obj => (obj.liked = "fa fa-heart"));
    //hallo github
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
          <tbody>
            {this.state.movies.map(movie => (
              <Movie
                key={movie._id}
                _id={movie._id}
                onDelete={this.handleDelete}
                onFavmovie={this.favmovies}
                title={movie.title}
                genre={movie.genre.name}
                numberInStock={movie.numberInStock}
                dailyRentalRate={movie.dailyRentalRate}
                favorite={movie.liked}
              />
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default movies;
