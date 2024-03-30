import React, { Component } from "react";
import { Col, Row } from 'antd'

import MovieListItem from "../MovieListItem/MovieListItem";

import './MovieList.css'

export default class MovieList extends Component {
 
  render() {
    const {data} = this.props;
    return (
      <Row gutter={[32, 32]} justify="center" className="movie-list">
        {data.map((movie) => (
          <Col span={12} key={movie.id}>
            <MovieListItem movie={movie}/>
          </Col>
        ))}
      </Row>
    )
  }
}