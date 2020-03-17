import React, { Component } from "react";
import Joi from "joi-browser";

class registerForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
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
            {this.state.errors.emailaddress && (
              <div className="alert alert-danger">
                {this.state.errors.emailaddress}
              </div>
            )}
          </div>
          <div className="form-group">
            <label forhtml="Password">Password</label>
            <input
              type="password"
              className="form-control"
              id="Password"
              onChange={this.handleChange}
              value={this.state.account.password}
              name="password"
              error={this.state.errors.password}
            />
            {this.state.errors.password && (
              <div className="alert alert-danger">
                {this.state.errors.password}
              </div>
            )}
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
              error={this.state.errors.name}
            />
            {this.state.errors.name && (
              <div className="alert alert-danger">{this.state.errors.name}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={this.validate()}
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default registerForm;
