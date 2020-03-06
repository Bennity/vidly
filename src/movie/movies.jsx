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

  fillHeart = id => {
    const movies = [...this.state.movies];
    const movie = movies.filter(obj => obj._id === id);
    this.addtoFavs(movie);
    if (movie.map(obj => obj.liked) == "fa fa-heart-o") {
      movie.map(obj => (obj.liked = "fa fa-heart"));
      this.setState({ movie });
    } else {
      movie.map(obj => (obj.liked = "fa fa-heart-o"));
      this.setState({ movie });
    }
  };

  addtoFavs = movie => {
    if (
      Object.entries(this.state.favmovies).length === 0 &&
      this.state.favmovies.constructor === Object
    ) {
      let favmovies = movie;
      this.setState(favmovies);
    } else {
      const favmovies = [...this.state.favmovies];
      let favmovie = favmovies.filter(obj => obj.liked == "fa fa-heart");
      console.log(favmovie);
      favmovies.push(favmovie);
      this.setState({ favmovies });
    }
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
                onFavmovie={this.fillHeart}
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
