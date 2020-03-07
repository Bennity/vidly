import React, { Component } from "react";
import { getMovies } from "./../services/fakeMovieService";
import Movie from "./movie";
import Pagination from "../pagination/pagination";
import { paginate } from "../utils/paginate";
import Genre from "../genre/genre";

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
    pageSize: 4,
    currentPage: 1,
    genre: []
  };

  handleDelete = id => {
    const movies = this.state.movies.filter(obj => obj._id !== id);
    console.log(movies, id);
    this.setState({ movies });
  };

  fillHeart = id => {
    const movies = [...this.state.movies];
    const movie = movies.filter(obj => obj._id === id);
    //this.addtoFavs(movie);
    if (movie.map(obj => obj.liked) == "fa fa-heart-o") {
      movie.map(obj => (obj.liked = "fa fa-heart"));
      this.setState({ movies });
    } else {
      movie.map(obj => (obj.liked = "fa fa-heart-o"));
      this.setState({ movies });
    }
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreChange = genre => {
    if (genre == "All Genres") {
      let movies = this.state.movies.map(obj => obj);
      this.setState({ genre: movies });
    } else {
      const movies = this.state.movies.filter(obj => obj.genre.name === genre);
      console.log(movies);
      this.setState({ genre: movies, currentPage: 1 });
    }
  };

  render() {
    return (
      <React.Fragment>
        <p>Showing {this.state.movies.length} movies in the Database.</p>
        <Genre
          genre={this.state.movies.map(obj => obj.genre.name)}
          onGenreChange={this.handleGenreChange}
        />
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
            {paginate(
              this.state.genre,
              this.state.currentPage,
              this.state.pageSize
            ).map(movie => (
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
          <Pagination
            itemsCount={this.state.movies.length}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          />
        </table>
      </React.Fragment>
    );
  }
}

export default movies;
