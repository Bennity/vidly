import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

const navbar = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        <Link to="/">Vidly</Link>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <NavLink className="nav-link" to="/Movies">
              <Link to="/Movies/">Movies</Link>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Customers">
              <Link to="/Customers">Customers</Link>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Rentals">
              <Link to="/Rentals">Rentals</Link>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Rentals">
              <Link to="/Login">Login</Link>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Register">
              <Link to="/Register">Register</Link>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default navbar;
