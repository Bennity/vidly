import React, { Component } from "react";
import Joi from "joi";

class registerForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    console.log("submit");
  };

  handleChange = e => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validate(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];

    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account, errors });
  };

  validate = () => {
    const result = Joi.validate(this.state.account, this.schema);
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  state = {
    account: { emailaddress: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    emailaddress: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required()
  };

  render() {
    return (
      <React.Fragment>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label forhtml="emailaddress">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="emailaddress"
              aria-describedby="emailHelp"
              onChange={this.handleChange}
              value={this.state.account.emailaddress}
              name="emailaddress"
            />
          </div>
          {this.state.error && (
            <div>className="alert alert-danger">{this.state.error}</div>
          )}
          <div className="form-group">
            <label forhtml="Password">Password</label>
            <input
              type="password"
              className="form-control"
              id="Password"
              onChange={this.handleChange}
              value={this.state.account.password}
              name="password"
            />
          </div>
          <div className="form-group">
            <label forhtml="Name">Name</label>
            <input
              type="text"
              className="form-control"
              id="Name"
              onChange={this.handleChange}
              value={this.state.account.name}
              name="name"
            />
          </div>
          {this.state.error && (
            <div>className="alert alert-danger">{this.state.error}</div>
          )}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default registerForm;
