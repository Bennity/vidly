import React from "react";
import { Link, NavLink } from "react-router-dom";

const navbar = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/">Vidly</Link>
      <Link className="navbar-brand" to="/"></Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <NavLink className="nav-link" to="/Movies/">
              Movies
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Customers">
              Customers
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Rentals">
              Rentals
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Rentals">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Register">
              Register
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Movies/New">
              New Movie
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default navbar;
