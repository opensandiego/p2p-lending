import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { debounce } from "lodash";

import * as api from "../app/backendCalls";
import Octicon from "./Octicon";

class SearchBar extends Component {
  state = {
    content: [],
    searchString: "",
    isFocused: false,
    isLoading: false,
  };

  componentDidMount() {
    this.searchContent("*");
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onChange = e => {
    const { value } = e.target;
    this.setState({ searchString: value, isLoading: true }, () => this.searchContent(value));
  };

  onSubmit = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      const { content, searchString } = this.state;
      if (content.length > 0) {
        console.log("Submit search");
      }
    }
  };

  searchContent = debounce(value => {
    console.log("searched content");
  }, 300);

  onBlur = e => {
    // Delay onBlur to provide time for redirect
    this.timeout = setTimeout(() => this.setState({ isFocused: false }), 150);
  };

  render() {
    const { content, searchString, isFocused, isLoading } = this.state;
    return (
      <form
        className="mt-3 flex-item search border rounded d-flex align-items-center position-relative mr-2 p-2"
        ref={c => (this.searchbar = c)}
        onKeyPress={this.onSubmit}
        onFocus={() => this.input.focus()}
        onClick={() => this.input.focus()}
        tabIndex="0"
      >
        <Octicon name="search" className="d-flex align-items-center mr-2" fill="#a8a8a8" />
        <input
          type="search"
          onChange={this.onChange}
          value={searchString}
          onFocus={() => this.setState({ isFocused: true })}
          onBlur={this.onBlur}
          ref={c => (this.input = c)}
          className="search-input"
          placeholder="Search for titles or topics..."
        />
      </form>
    );
  }
}

export default withRouter(SearchBar);
