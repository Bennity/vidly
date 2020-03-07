import React, { Component } from "react";
import { getMovies } from "./../services/fakeMovieService";
import Movie from "./movie";
import Pagination from "../pagination/pagination";
import movie from "./movie";

class movies extends Component {
  fetchMovies = () => {
    let moviewithliked = [];
    getMovies().map(obj => {
      return moviewithliked.push(
        Object.assign(obj, { liked: "fa fa-heart-o" })
      );
    });
    this.calcPages(moviewithliked);
    return moviewithliked;
  };

  calcPages = moviewithliked => {
    let copyofmovies = [...moviewithliked];
    let pagecounter = 0;
    let arraywithmovies = [];
    const moviesperpage = 4;
    let arraywithpages = [];

    for (let i = 0; i <= copyofmovies.length; i++) {
      pagecounter++;
      arraywithmovies.push(copyofmovies[i]);
      //copyofmovies.splice(copyofmovies[i], 1);
      if (pagecounter === moviesperpage) {
        arraywithpages.push(arraywithmovies);
        pagecounter = 0;
        arraywithmovies = [];
        copyofmovies.splice(copyofmovies[i], 4);
        i = -1;
      }
    }
  };

  state = {
    movies: this.fetchMovies(),
    pages: {}
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

  addtoFavs = movie => {
    /* if (
      Object.entries(this.state.favmovies).length === 0 &&
      this.state.favmovies.constructor === Object
    ) {
      let favmovies = movie;
      this.setState({ favmovies });
    }

    let counter;

    if (counter === null) {
      let favmovies = movie;
      this.setState({ favmovies: movie });
      counter++;
    } else {
      let pass;

      for (let key in this.state.favmovies) {
        console.log(key, this.state.favmovies[key]);
      }

       this.state.favmovies.forEach(element => {
        if (movie.map(obj => obj._id) === element.map(obj => obj._id)) {
          pass = false;
        } else {
          pass = true;
        }
      });

      if (pass) {
        console.log("passed");
        const favmovies = [...this.state.favmovies];
        favmovies.push(movie);
        this.setState({ favmovies });
      } else if (!pass) {
        console.log("not passed");
        const favmovies = [...this.state.favmovies];
        favmovies.splice(movie);
        this.setState({ favmovies });
      }
    } */
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
          <Pagination />
        </table>
      </React.Fragment>
    );
  }
}

export default movies;
