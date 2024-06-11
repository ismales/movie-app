import React, { Component } from "react";
import { Flex, Typography, Rate } from "antd";

import MovieGenre from "./MovieGenre";

import TMDBContext from "../../services/TMDBContext";

import "./MovieInfo.css";

const { Text, Title } = Typography;

export default class MovieInfo extends Component {
  state = {
    userRate: 0,
  };

  componentDidUpdate(prevState) {
    const { movie } = this.props;
    const { id } = movie;
    const { userRate } = this.state;

    const movieService = this.context;

    if (prevState.userRate !== userRate) {
      movieService.addRatedMovie(id, userRate);
    }
  }

  limitText = (text, limit) => {
    const cut = text.indexOf(" ", limit);
    if (cut === -1) return text;
    return `${text.substring(0, cut)} ...`;
  };

  ratingBorderColor = (num) => {
    switch (true) {
      case num < 3:
        return "#E90000";
      case num < 5:
        return "#E97E00";
      case num < 7:
        return "#E9D100";
      default:
        return "#66E900";
    }
  };

  saveRatedMovie = (rate) => {
    this.setState({ userRate: rate });
  };

  render() {
    const { movie } = this.props;
    const {
      title,
      release_date: date,
      genre_ids: genres,
      vote_average: rating,
      overview: description,
      rating: stars,
    } = movie;

    return (
      <Flex gap="small" vertical>
        <Flex justify="space-between" align="center">
          <Title level={4} className="title">
            {title}
          </Title>
          <Text
            className="rating"
            style={{
              borderColor: this.ratingBorderColor(rating),
            }}
          >
            {rating.toFixed(1)}
          </Text>
        </Flex>
        <Text type="secondary">{date}</Text>
        <Flex gap={4} style={{ flexWrap: "wrap", overflow: "scroll" }}>
          <MovieGenre genre={genres} />
        </Flex>
        <Text className="description">{this.limitText(description, 100)}</Text>
        <Rate
          className="rate"
          count={10}
          onChange={this.saveRatedMovie}
          defaultValue={stars}
        />
      </Flex>
    );
  }
}

MovieInfo.contextType = TMDBContext;
