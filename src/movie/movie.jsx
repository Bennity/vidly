import React, { Component } from "react";
import { Link } from "react-router-dom";

const movie = props => {
  return (
    <React.Fragment>
      <tr>
        <li key={props._id}>
          <Link to={`/movies/${props._id}`}>{props.title}</Link>
        </li>

        <td>{props.genre}</td>
        <td>{props.numberInStock}</td>
        <td>{props.dailyRentalRate}</td>
        <td>
          <button
            onClick={() => props.onDelete(props._id)}
            type="button"
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
        <td>
          <i
            onClick={() => props.onLiked(props._id)}
            className={props.favorite}
            aria-hidden="false"
          ></i>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default movie;
