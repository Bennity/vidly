import React, { Component } from "react";
import Movie from "./movie";
import { paginate } from "../utils/paginate";
import Genre from "./genre";
import Pagination from "./pagination";

class movies extends Component {
  selector = () => {
    switch (this.props.selector) {
      case "genres":
        return this.props.genres;
      case "search":
        return this.props.search;
      case "sort":
        return this.props.sort;
      default:
        return this.props.movies;
    }
  };

  render() {
    return (
      <React.Fragment>
        <p>Showing {this.selector().length} movies in the Database.</p>
        <Genre
          genre={this.props.movies.map(obj => obj.genre.name)}
          onGenreChange={this.props.onGenreChange}
        />
        <table className="table">
          <thead>
            <tr>
              <th scope="col" onClick={() => this.props.onSort("title", "asc")}>
                Title {this.props.sortIcon()}
              </th>
              <th scope="col" onClick={() => this.props.onSort("Genre")}>
                Genre {this.props.sortIcon()}
              </th>
              <th scope="col" onClick={() => this.props.onSort("Stock")}>
                Stock {this.props.sortIcon()}
              </th>
              <th scope="col" onClick={() => this.props.onSort("Rate")}>
                Rate {this.props.sortIcon()}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginate(
              this.selector(),
              this.props.currentPage,
              this.props.pageSize
            ).map(movie => (
              <Movie
                key={movie._id}
                _id={movie._id}
                title={movie.title}
                onDelete={this.props.onDelete}
                onLiked={this.props.onLiked}
                genre={movie.genre.name}
                numberInStock={movie.numberInStock}
                dailyRentalRate={movie.dailyRentalRate}
                favorite={movie.liked}
              />
            ))}
          </tbody>
          <Pagination
            itemsCount={this.props.movies.length}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChange={this.props.onPageChange}
          />
        </table>
      </React.Fragment>
    );
  }
}

export default movies;
