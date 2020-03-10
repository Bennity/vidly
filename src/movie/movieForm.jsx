import React, { Component } from "react";
import Joi from "joi-browser";

class MovieForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    console.log("submit");
  };

  state = {
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
          >
            Save
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default MovieForm;
