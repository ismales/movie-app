import React, { Component } from "react";
import { Flex } from "antd";

import MovieInfo from "../MovieInfo/MovieInfo";

import "./MovieListItem.css";

export default class MovieListItem extends Component {
  poster = () => {
    const { movie } = this.props;
    const { poster_path: img } = movie;
    const base = "https://image.tmdb.org/t/p/original/";
    if (img.startsWith(base)) {
      return img;
    }
    return base + img;
  };

  render() {
    const { movie } = this.props;
    const { id, title } = movie;

    return (
      <Flex key={id} className="movie-list-item" gap="middle">
        <img className="movie-img" src={this.poster()} alt={title} />
        <MovieInfo movie={movie} />
      </Flex>
    );
  }
}
