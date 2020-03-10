import React, { Component } from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";
import { saveMovie } from "../services/fakeMovieService";

class MovieForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.addToMovies(e);
    console.log("submit");
  };

  /*  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "The Avengers",
    genre: { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
    numberInStock: 7,
    dailyRentalRate: 3.5
  } */

  addToMovies = () => {
    const movie_id = 1 + this.state.counter;
    console.log(movie_id);
    const genre_id = 1 + this.state.counter;
    this.state.counter++;

    const movieobject = {
      //_id: movie_id.toString(),
      title: this.state.account.title,
      genre: { _id: genre_id.toString(), name: this.state.account.genre },
      numberinstock: this.state.account.numberinstock,
      rate: this.state.account.rate
    };
    console.log(movieobject);

    saveMovie(movieobject);
  };

  state = {
    counter: 0,
    account: { title: "", genre: "", numberinstock: "", rate: "" },
    errors: {}
  };

  schema = {
    title: Joi.string().required(),
    genre: Joi.string().required(),
    numberinstock: Joi.string().required(),
    rate: Joi.string().required()
  };

  handleChange = e => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];

    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account, errors });
  };

  validate = () => {
    const result = Joi.validate(this.state.account, this.schema);
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
              <label for="title">Title</label>
              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="My New Movie"
                name="title"
                onChange={this.handleChange}
                error={this.state.errors.name}
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
              <label for="numberinstock">Number in Stock</label>
              <input
                type="text"
                class="form-control"
                id="numberinstock"
                name="numberinstock"
                error={this.state.errors.name}
                onChange={this.handleChange}
              ></input>
              {this.state.errors.name && (
                <div className="alert alert-danger">
                  {this.state.errors.name}
                </div>
              )}
            </div>
            <div class="form-group">
              <label for="rate">Rate</label>
              <input
                type="text"
                class="form-control"
                id="rate"
                name="rate"
                error={this.state.errors.name}
                onChange={this.handleChange}
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
            onClick={() => this.props.history.push("/movies")}
          >
            Save
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default MovieForm;
