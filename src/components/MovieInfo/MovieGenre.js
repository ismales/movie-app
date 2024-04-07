import React, { Component } from "react";
import { Tag } from "antd";

export default class MovieGenre extends Component {
  render() {
    const { genre } = this.props;
    return <Tag>{genre}</Tag>;
  }
}
