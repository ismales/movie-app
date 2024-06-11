import React, { Component } from "react";
import { format } from "date-fns";
import { Row, Col } from "antd";

import MovieList from "../MovieList/MovieList";
import TMDBservice from "../../services/TMDBservice";
import Error from "../Error/Error";
import Spinner from "../Spinner/Spinner";
import Searchbar from "../Searchbar/Searchbar";

export default class SearchTab extends Component {
  movieService = new TMDBservice();

  state = {
    data: [],
    loading: true,
    error: false,
    searchValue: null,
    currentPage: 1,
    totalPages: 1,
  };

  componentDidMount() {
    this.setState({ loading: false });
  }

  errorHandler = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  updateSearchValue = (text) => {
    this.setState({ searchValue: text }, () => this.updateData());
  };

  showSpinner = () => {
    this.setState({ loading: true });
  };

  pageSelected = (page) => {
    this.setState({ currentPage: page }, () => {
      window.scrollTo(0, 0);
      this.updateData();
    });
  };

  updateData() {
    const moviesArr = [];
    const { searchValue, currentPage } = this.state;

    this.movieService
      .getMovies(searchValue, currentPage)
      .then((movies) => {
        movies.results.forEach((movie) => {
          moviesArr.push({
            id: movie.id,
            title: movie.title,
            backdrop_path: !movie.backdrop_path
              ? "https://image.tmdb.org/t/p/original"
              : null,
            release_date: movie.release_date
              ? format(movie.release_date, "MMMM d, y")
              : "The date is unknown",
            genre_ids: movie.genre_ids,
            vote_average: movie.vote_average,
            overview: movie.overview,
            poster_path: movie.poster_path
              ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
              : // eslint-disable-next-line global-require
                require("../../img/noimage.jpg"),
          });
        });
        this.setState({
          data: moviesArr,
          totalPages: movies.total_pages > 500 ? 500 : movies.total_pages,
          loading: false,
        });
      })
      .catch(this.errorHandler);
  }

  render() {
    const { data, searchValue, loading, error, totalPages } = this.state;
    const errorScreen = error ? (
      <Error description="Can't connect to server" type="error" />
    ) : null;
    const spinner = loading ? <Spinner /> : null;
    const content =
      !error && !loading ? (
        <MovieList
          data={data}
          loading={loading}
          searchValue={searchValue}
          totalPages={totalPages}
          pageSelected={this.pageSelected}
        />
      ) : null;
    return (
      <Row gutter={[32, 14]} justify="center">
        <Col span={24}>
          <Searchbar
            updateSearchValue={this.updateSearchValue}
            showSpinner={this.showSpinner}
          />
        </Col>
        <Col span={24}>
          {errorScreen}
          {spinner}
          {content}
        </Col>
      </Row>
    );
  }
}
