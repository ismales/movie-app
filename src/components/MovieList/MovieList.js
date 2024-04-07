import React, { Component } from "react";
import { Col, Row, Pagination } from "antd";
import Error from "../Error/Error";

import MovieListItem from "../MovieListItem/MovieListItem";

import "./MovieList.css";

export default class MovieList extends Component {
  render() {
    const { data, searchValue, totalPages, pageSelected } = this.props;
    const content = (
      <>
        {data.map((movie) => (
          <Col span={12} key={movie.id}>
            <MovieListItem movie={movie} />
          </Col>
        ))}
        <Pagination
          total={totalPages}
          showSizeChanger={false}
          hideOnSinglePage="true"
          onChange={pageSelected}
        />
      </>
    );

    const notFoundError =
      searchValue && data.length === 0 ? (
        <Col span={24}>
          <Error description="No movie found" type="warning" />
        </Col>
      ) : null;

    return (
      <Row gutter={[32, 28]} justify="center" className="movie-list">
        {content}
        {notFoundError}
      </Row>
    );
  }
}
