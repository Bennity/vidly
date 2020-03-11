import React, { Component } from "react";
import Joi from "joi-browser";
import { saveMovie, getMovie } from "../services/fakeMovieService";

class MovieForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.addToMovies(e);
    console.log("submit");
    this.props.history.push("/movies");
  };

  componentDidMount = () => {
    if (this.props.match.params.id != "New") {
      const movies = getMovie(this.props.match.params.id);
      this.setState({ movies });
    }
  };

  addToMovies = () => {
    const movie_id = 1 + this.state.counter;
    const genre_id = 1 + this.state.counter;
    this.state.counter++;

    const movieobject = {
      _id: movie_id.toString(),
      title: this.state.movies.title,
      genre: { _id: genre_id.toString(), name: this.state.movies.genre },
      numberInStock: this.state.movies.numberInStock,
      dailyRentalRate: this.state.movies.dailyRentalRate,
      liked: "fa fa-heart-o"
    };
    if (this.state.movies._id === "") {
      this.props.movies.push(movieobject);
    } else {
      this.props.movies.splice(
        this.props.movies.filter(obj => this.state.movies._id === obj._id),
        1
      );
      this.props.movies.push(movieobject);
    }
    //saveMovie(movieobject);
  };

  /*  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "The Avengers",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInStock: 7,
    dailyRentalRate: 3.5
  } */

  state = {
    counter: 0,
    movies: {
      _id: "",
      title: "",
      genre: { _id: "", name: "" },
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {}
  };

  schema = {
    _id: Joi.string().allow(""),
    title: Joi.string().required(),
    genre: Joi.string().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required(),
    liked: Joi.string()
  };

  handleChange = e => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];

    const movies = { ...this.state.movies };
    movies[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ movies, errors });
  };

  validate = () => {
    const result = Joi.validate(this.state.movies, this.schema);
    console.log(result);
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <h1>Movie Form</h1>
          <form>
            <div class="form-group">
              <label for="title">Title </label>
              <input
                type="text"
                class="form-control"
                id="title"
                name="title"
                value={this.state.movies.title}
                onChange={this.handleChange}
                error={this.state.errors.name}
                //value={}
              />
              {this.state.errors.name && (
                <div className="alert alert-danger">
                  {this.state.errors.name}
                </div>
              )}
            </div>
            <div class="form-group">
              <label for="genre">Genre</label>
              <select
                class="form-control"
                id="genre"
                name="genre"
                onChange={this.handleChange}
                value={this.state.movies.genre.name}
              >
                <option>Action</option>
                <option>Comedy</option>
                <option>Thriller</option>
              </select>
              {this.state.errors.name && (
                <div className="alert alert-danger">
                  {this.state.errors.name}
                </div>
              )}
            </div>
            <div class="form-group">
              <label for="numberInStock">Number in Stock</label>
              <input
                type="text"
                class="form-control"
                id="numberInStock"
                name="numberInStock"
                error={this.state.errors.name}
                onChange={this.handleChange}
                value={this.state.movies.numberInStock}
              ></input>
              {this.state.errors.name && (
                <div className="alert alert-danger">
                  {this.state.errors.name}
                </div>
              )}
            </div>
            <div class="form-group">
              <label for="dailyRentalRate">Daily Rental Rate</label>
              <input
                type="text"
                class="form-control"
                id="dailyRentalRate"
                name="dailyRentalRate"
                error={this.state.errors.name}
                onChange={this.handleChange}
                value={this.state.movies.dailyRentalRate}
              ></input>
              {this.state.errors.name && (
                <div className="alert alert-danger">
                  {this.state.errors.name}
                </div>
              )}
            </div>
          </form>
          <button
            className="btn btn-primary"
            onClick={this.handleSubmit}
            disabled={this.validate()}
            // onClick={() => this.props.history.push("/movies")}
          >
            Save
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default MovieForm;
