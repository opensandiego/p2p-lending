import React, { Component } from "react";
import SearchBar from "../../components/SearchBar";

class Titles extends Component {
  render() {
    return (
        <div id="app">

          <div className="flex-container"> 
            <SearchBar />
          </div>
        </div>
    );
  }
}

export default Titles;
