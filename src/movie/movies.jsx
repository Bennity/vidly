import React, { Component } from "react";
import Movie from "./movie";
import { paginate } from "../utils/paginate";
import Genre from "../genre/genre";
import Pagination from "../pagination/pagination";

const movies = props => {
  return (
    <React.Fragment>
      <p>Showing {props.movies.length} movies in the Database.</p>
      <Genre
        genre={props.movies.map(obj => obj.genre.name)}
        onGenreChange={props.onGenreChange}
      />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Rate</th>
          </tr>
        </thead>
        <tbody>
          {paginate(props.movies, props.currentPage, props.pageSize).map(
            movie => (
              <Movie
                key={movie._id}
                _id={movie._id}
                title={movie.title}
                onDelete={props.onDelete}
                onLiked={props.onLiked}
                numberInStock={movie.numberInStock}
                dailyRentalRate={movie.dailyRentalRate}
                heart={movie.liked}
              />
            )
          )}
        </tbody>
        <Pagination
          itemsCount={props.movies.length}
          pageSize={props.pageSize}
          currentPage={props.currentPage}
          onPageChange={props.onPageChange}
        />
      </table>
    </React.Fragment>
  );
};

export default movies;
