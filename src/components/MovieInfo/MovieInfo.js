import React, { Component } from "react";
import { Flex, Typography } from "antd";

import MovieGenre from "./MovieGenre";

const { Text, Title } = Typography;

export default class MovieInfo extends Component {
  limitText(text, limit) {
    const cut = text.indexOf(" ", limit);
    if (cut === -1) return text;
    return `${text.substring(0, cut)} ...`;
  }

  render() {
    const { movie } = this.props;
    const { title, date, genres, description } = movie;

    return (
      <Flex gap="small" vertical>
        <Title level={4}>{title}</Title>
        <Text type="secondary">{date}</Text>
        <Flex gap={5}>
          {genres.map((item, i) => (
            <MovieGenre key={item[i]} genre={item} />
          ))}
        </Flex>
        <Text>{this.limitText(description, 160)}</Text>
      </Flex>
    );
  }
}
