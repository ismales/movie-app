import React, { Component } from "react";
import { format } from "date-fns";

import MovieList from "./components/MovieList/MovieList";
import TMDBservice from "./services/TMDBservice";

import "./App.css";

export default class App extends Component {
  movieService = new TMDBservice();

  state = {
    data: [],
  };

  constructor(props) {
    super(props);
    this.updateData();
  }

  updateData() {
    const moviesArr = [];

    this.movieService.getMovies().then((movies) => {
      movies.results.forEach((movie) => {
        moviesArr.push({
          id: movie.id,
          title: movie.title,
          date: movie.release_date
            ? format(movie.release_date, "MMMM d, y")
            : "The date is unknown",
          genres: ["drama", "action"],
          description: movie.overview,
          img: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
        });
      });

      this.setState({
        data: moviesArr,
      });
    });
  }

  render() {
    const { data } = this.state;
    return (
      <main className="main">
        <MovieList data={data} />
      </main>
    );
  }
}
