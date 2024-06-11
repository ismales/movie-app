import React, { Component } from "react";
import { Tag } from "antd";

import TMDBContext from "../../services/TMDBContext";

export default class MovieGenre extends Component {
  getGenres = (allGenres) => {
    const { genre } = this.props;
    const movieGenres = [];
    if (genre.length === 0) movieGenres.push("Genre not found");
    allGenres
      .filter((element) => genre.includes(element.id))
      .forEach((element) => {
        movieGenres.push(element.name);
      });
    return movieGenres;
  };

  render() {
    let id = 1;

    return (
      <TMDBContext.Consumer>
        {({ allGenres }) => {
          const movieGenres = this.getGenres(allGenres);
          return movieGenres.map((genre) => (
            <Tag key={id++} className="genre">
              {genre}
            </Tag>
          ));
        }}
      </TMDBContext.Consumer>
    );
  }
}
