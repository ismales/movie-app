import React, { Component } from "react";
import { Alert } from "antd";

import "./Error.css";

export default class Error extends Component {
  render() {
    const { description } = this.props;
    return (
      <Alert
        className="error-text"
        message="Error"
        description={description}
        type="error"
      />
    );
  }
}
