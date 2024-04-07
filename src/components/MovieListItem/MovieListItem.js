import React, { Component } from "react";
import { Flex } from "antd";

import MovieInfo from "../MovieInfo/MovieInfo";

import "./MovieListItem.css";

export default class MovieListItem extends Component {
  render() {
    const { movie } = this.props;
    const { id, title, img } = movie;

    return (
      <Flex key={id} className="movie-list-item" gap="middle">
        <img className="movie-img" src={img} alt={title} />
        <MovieInfo movie={movie} />
      </Flex>
    );
  }
}
