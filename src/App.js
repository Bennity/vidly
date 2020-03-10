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
import NewMovie from "./movie/newMovie";

//implement sort and orderby mit lodash
//Jquery lernen
//Specific routes on the top!!!

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
    currentPage: 1,
    genre: []
  };

  handleDelete = id => {
    const movies = this.state.genre.filter(obj => obj._id !== id);
    this.setState({ movies });
    const genre = this.state.genre.filter(obj => obj._id !== id);
    this.setState({ genre });
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
        <Navbar />
        <Switch>
          <Route path="/Movies/:id" component={MovieForm} />
          <Route path="/NewMovie" component={NewMovie} />
          <Route
            path="/Movies"
            render={props => (
              <Movies
                {...props}
                movies={this.state.movies}
                genre={this.state.genre}
                genreLength={this.state.genre.length}
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
