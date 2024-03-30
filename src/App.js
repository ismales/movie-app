import React, { Component } from "react";
import { format } from "date-fns";
import { Spin, Alert } from "antd";

import MovieList from "./components/MovieList/MovieList";
import TMDBservice from "./services/TMDBservice";

import "./App.css";

export default class App extends Component {
  movieService = new TMDBservice();

  state = {
    data: [],
    loading: true,
    error: false,
  };

  constructor(props) {
    super(props);
    this.updateData();
  }

  errorHandler = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  updateData() {
    const moviesArr = [];

    this.movieService
      .getMovies()
      .then((movies) => {
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
          loading: false,
        });
      })
      .catch(this.errorHandler);
  }

  render() {
    const { data, loading, error } = this.state;
    const errorScreen = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !loading ? <MovieList data={data} /> : null;

    return (
      <main className="main">
        {errorScreen}
        {spinner}
        {content}
      </main>
    );
  }
}

function Spinner() {
  return (
    <Spin tip="Loading" size="large">
      <div className="content" />
    </Spin>
  );
}

function ErrorMessage() {
  if (!navigator.onLine) {
    return <Alert message="Error" description="Check Internet" type="error" />;
  }
  return <Alert message="Error" description="Can't connnet to server" type="error" />;
}
