import React, { Component } from "react";
import { Input } from "antd";
import debounce from "lodash.debounce";

export default class Searchbar extends Component {
  debounced = debounce((movieName) => {
    const { updateSearchValue } = this.props;
    updateSearchValue(movieName);
  }, 700);

  onChange = (e) => {
    const { showSpinner } = this.props;
    this.debounced(e.target.value);
    showSpinner();
  };

  render() {
    return (
      <Input
        name="search bar"
        placeholder="Type to search..."
        onChange={this.onChange}
      />
    );
  }
}
