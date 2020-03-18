import React from "react";
import { Link } from "react-router-dom";

const movie = props => {
  return (
    <React.Fragment>
      <tr>
        <td key={props._id}>
          <Link to={`/Movies/${props._id}`}>{props.title}</Link>
        </td>

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
            onClick={() => props.onLike(props._id)}
            className={props.likeIcon}
            aria-hidden="false"
          ></i>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default movie;
