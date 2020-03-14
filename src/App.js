import React, { Component } from "react";
import Movies from "./common/movies";
import { Route, Redirect, Switch } from "react-router-dom";
import Navbar from "./common/navbar";
import { getMovies } from "./services/fakeMovieService";
import Rentals from "./common/rentals";
import Customers from "./common/customers";
import NotFound from "./common/notFound";
import MovieForm from "./common/movieForm";
import LoginForm from "./common/loginForm";
import RegisterForm from "./common/registerForm";
import Search from "./common/search";
import _ from "lodash";

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
    movies: [],
    genres: [],
    search: [],
    sort: [],
    selector: "",
    pageSize: 4,
    currentPage: 1
  };

  componentDidMount() {
    this.setState({ movies: this.fetchMovies(), selector: "All Genres" });
  }

  handleDelete = id => {
    const movies = this.state.movies.filter(obj => obj._id !== id);
    const genres = this.state.genres.filter(obj => obj._id !== id);
    this.setState({ movies, genres });
  };

  fillHeart = id => {
    const movies = [...this.state.movies];
    const movie = movies.filter(obj => obj._id === id);
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
      const movies = this.state.movies.map(obj => obj);
      this.setState({ movies, selector: genrename });
    } else {
      const genres = this.state.movies.filter(
        obj => obj.genre.name === genrename
      );
      this.setState({ genres, currentPage: 1, selector: "genres" });
    }
  };

  handleSearch = e => {
    e.preventDefault();
    const input = e.currentTarget.value;
    const search = this.state.movies.filter(
      obj =>
        obj.title[e.currentTarget.value.length - 1] === input[input.length - 1]
    );

    this.setState({ search, selector: "search" });
  };

  handleSort = (column, order) => {
    if (order == "asc") {
      const sort = _.orderBy(this.state.movies, [column], [order]);
      this.setState({ sort, selector: "sort" });
    } else {
      const sort = _.orderBy(this.state.movies, [column], ["desc"]);
      this.setState({ sort, selector: "sort" });
    }
  };

  sortIcon = order => {
    if (order == "asc") return <i className="fa fa-sort-asc" />;
    else if (order == "desc") return <i className="fa fa-sort-desc" />;
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
                selector={this.state.selector}
                movies={this.state.movies}
                genres={this.state.genres}
                search={this.state.search}
                sort={this.state.sort}
                movieLength={this.state.movies.length}
                onGenreChange={this.handleGenreChange}
                onPageChange={this.handlePageChange}
                pageSize={this.state.pageSize}
                currentPage={this.state.currentPage}
                onDelete={this.handleDelete}
                onLiked={this.fillHeart}
                onSort={this.handleSort}
                sortIcon={this.sortIcon}
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
