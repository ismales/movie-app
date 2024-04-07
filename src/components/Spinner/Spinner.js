import React, { Component } from "react";
import { Spin } from "antd";

export default class Spinner extends Component {
  render() {
    return (
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>
    );
  }
}
