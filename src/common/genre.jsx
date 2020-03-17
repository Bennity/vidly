import React from "react";

const genre = props => {
  return (
    <ul className="list-group">
      <li
        className="list-group-item"
        onClick={() => props.onGenreChange("All Genres")}
      >
        All Genres
      </li>
      <li
        className="list-group-item"
        onClick={() => props.onGenreChange("Action")}
      >
        Action
      </li>
      <li
        className="list-group-item"
        onClick={() => props.onGenreChange("Comedy")}
      >
        Comedy
      </li>
      <li
        className="list-group-item"
        onClick={() => props.onGenreChange("Thriller")}
      >
        Thriller
      </li>
    </ul>
  );
};

export default genre;
