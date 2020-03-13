import React, { Component } from "react";
import Movies from "./movie/movies";
import { Route, Redirect, Switch } from "react-router-dom";
import Navbar from "./navbar/navbar";
import { getMovies } from "./services/fakeMovieService";
import Rentals from "./rentals/rentals";
import Customers from "./customers/customers";
import NotFound from "./not found/notFound";
import MovieForm from "./movie/movieForm";
import LoginForm from "./forms/loginForm";
import RegisterForm from "./forms/registerForm";
import Search from "./search/search";

//implement sort and orderby mit lodash
//Jquery lernen
//Specific routes on the top!!!
/* Yes. All false, 0, empty strings '' and "", NaN, undefined, and null are always evaluated as false; everything else is true.
And in your example, b is false after evaluation. (I think you mistakenly wrote true) */
//Object.assign merges objects together ULTRA USEFULLL!!!!
//CODEREFACTOR vidly --> useState und useEffect --> TypeScript Interfaces

class App extends Component {
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
    currentPage: 1
  };

  handleDelete = id => {
    const movies = this.state.genre.filter(obj => obj._id !== id);
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

  handleGenreChange = genrename => {
    if (genrename == "All Genres") {
      let movies = this.state.movies.map(obj => obj);
      this.setState({ movies });
    } else {
      const movies = this.state.movies.filter(
        obj => obj.genre.name === genrename
      );
      this.setState({ movies, currentPage: 1 });
    }
  };

  handleSearch = e => {
    e.preventDefault();
    const input = e.currentTarget.value;
    const movies = this.state.movies.filter(
      obj =>
        obj.title[e.currentTarget.value.length - 1] === input[input.length - 1]
    );

    this.setState({ movies });
  };

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Search onSearch={this.handleSearch} />
        <Switch>
          <Route
            path="/Movies/:id"
            render={props => (
              <MovieForm {...props} movies={this.state.movies} />
            )}
          />
          <Route
            path="/Movies/new"
            render={props => (
              <MovieForm {...props} movies={this.state.movies} />
            )}
          />
          <Route
            path="/Movies"
            render={props => (
              <Movies
                {...props}
                movies={this.state.movies}
                movieLength={this.state.movies.length}
                onGenreChange={this.handleGenreChange}
                onPageChange={this.handlePageChange}
                pageSize={this.state.pageSize}
                currentPage={this.state.currentPage}
                onDelete={this.handleDelete}
                onLiked={this.fillHeart}
              />
            )}
          />
          <Redirect exact from="/" to="/Movies" />
          <Route path="/Customers" component={Customers} />
          <Route path="/Rentals" component={Rentals} />
          <Route path="/Login" component={LoginForm} />
          <Route path="/Register" component={RegisterForm} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
