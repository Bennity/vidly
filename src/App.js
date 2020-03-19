import React, { useState, useEffect } from "react";
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

/* state = {
  movies: [],
  genres: [],
  search: [],
  sort: [],
  selector: "",
  order: "",
  pageSize: 4,
  currentPage: 1
}; */

/* componentDidMount() {
  setState({
    movies: fetchMovies(),
    selector: "All Genres",
    order: "asc"
  });
} */

const App = () => {
  const fetchMovies = () => {
    let moviewithliked = [];
    getMovies().map(obj => {
      return moviewithliked.push(
        Object.assign(obj, { liked: "fa fa-heart-o" })
      );
    });
    return moviewithliked;
  };

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState([]);
  const [sort, setSort] = useState([]);
  const [selector, setSelector] = useState("");
  const [order, setOrder] = useState("");
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setMovies(fetchMovies());
    setSelector("All Genres");
    setOrder("asc");
  }, []);

  const handleDelete = id => {
    setMovies(movies.filter(obj => obj._id !== id));
    setGenres(genres.filter(obj => obj._id !== id));
    setSort(sort.filter(obj => obj._id !== id));
    setSearch(search.filter(obj => obj._id !== id));
  };

  const handleLike = id => {
    //Refactoring ?
    const movie = movies.find(obj => obj._id === id);
    if (movie.liked === "fa fa-heart-o") {
      movie.liked = "fa fa-heart";
    } else {
      movie.liked = "fa fa-heart-o";
    }
    setMovies(movies.map(obj => obj));
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleGenreChange = genrename => {
    if (genrename === "All Genres") {
      setMovies(movies.map(obj => obj));
      setSelector(genrename);
    } else {
      const genres = movies.filter(obj => obj.genre.name === genrename);
      setGenres(genres);
      setCurrentPage(1);
      setSelector("genres");
    }
  };

  const handleSearch = e => {
    e.preventDefault();
    const input = e.currentTarget.value;
    const search = movies.filter(
      obj =>
        obj.title[e.currentTarget.value.length - 1] === input[input.length - 1]
    );

    setSearch(search);
    setSelector("search");
  };

  const handleSort = column => {
    if (order === "asc") setOrder("desc");
    else setOrder("asc");

    if (selector === "All Genres") {
      setMovies(_.orderBy(movies, [column], [order]));
      setSelector("All Genres");
    }

    if (selector === "genres") {
      setGenres(_.orderBy(genres, [column], [order]));
      setSelector("genres");
    }

    if (selector === "search") {
      setSearch(_.orderBy(search, [column], [order]));
      setSelector("search");
    }
  };

  const sortIcon = () => {
    if (order === "asc") return <i className="fa fa-sort-asc" />;
    else return <i className="fa fa-sort-desc" />;
  };

  return (
    <React.Fragment>
      <Navbar />
      <Search onSearch={handleSearch} />
      <Switch>
        <Route
          path="/Movies/:id"
          render={props => <MovieForm {...props} movies={movies} />}
        />
        <Route
          path="/Movies/new"
          render={props => <MovieForm {...props} movies={movies} />}
        />
        <Route
          path="/Movies"
          render={props => (
            <Movies
              {...props}
              selector={selector}
              movies={movies}
              genres={genres}
              search={search}
              sort={sort}
              movieLength={movies.length}
              onGenreChange={handleGenreChange}
              onPageChange={handlePageChange}
              pageSize={pageSize}
              currentPage={currentPage}
              onDelete={handleDelete}
              onLike={handleLike}
              onSort={handleSort}
              sortIcon={sortIcon}
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
};

export default App;
