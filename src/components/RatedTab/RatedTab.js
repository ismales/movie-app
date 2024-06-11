import React, { Component } from "react";
import { Row, Col } from "antd";

import TMDBContext from "../../services/TMDBContext";

import Error from "../Error/Error";
import MovieList from "../MovieList/MovieList";

export default class RatedTab extends Component {
  state = {
    movies: [],
    error: false,
  };

  componentDidMount() {
    const { movies } = this.state;
    if (movies.length === 0) this.getRatedMovies();
  }

  componentDidUpdate() {
    this.getRatedMovies();
  }

  getRatedMovies = () => {
    const movieService = this.context;

    movieService
      .getRatedMovies()
      .then((res) => {
        if (res.status_code === 34) {
          this.setState({ error: true });
        } else {
          this.setState({ movies: res.results });
        }
      })
      .catch(this.onErrorRatedMovies);
  };

  onErrorRatedMovies = () => {
    this.setState({ error: true });
  };

  render() {
    const { movies, error } = this.state;
    const errorScreen =
      movies.length === 0 || error ? (
        <Error description="There are no rated movie by you" />
      ) : null;
    const content = !errorScreen ? <MovieList data={movies} /> : null;

    return (
      <Row gutter={[32, 14]} justify="center">
        <Col span={24}>
          {errorScreen}
          {content}
        </Col>
      </Row>
    );
  }
}

RatedTab.contextType = TMDBContext;
