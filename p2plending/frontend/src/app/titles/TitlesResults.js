/* eslint-disable no-console */
import React, { Component } from "react";
import SearchBar from "../../components/SearchBar";
import queryString from "query-string";
import * as api from "../backendCalls";
import TitleItem from "./TitleItem";
import { withRouter } from "react-router-dom";
//Your initialization

class TitlesResults extends Component {
  state = {
    searchString: "",
    titles: []
  }
  
  componentDidMount(){
    // eslint-disable-next-line react/prop-types
    const values = queryString.parse(this.props.location.search)

    if (values != undefined ) {
      api.searchContentTitles(Object.keys(values)[0]).then(({ data }) => {
        this.setState({ titles: data, searchString: Object.keys(values)[0]  });
      });
    }
  }

  render() {
    const { searchString, titles } = this.state
    
    return (
        <div id="container p-4 my-5">

          <div
            className="opening-blurb border rounded p-4 text-center text-white bg-primary"
          >
            <span role="img" aria-label="emoji" style={{fontSize: 50}}>
              📚
            </span>
            <h2 className="m-0">Search Results: { searchString }</h2>
          </div>

          <div className="flex-container pt-2"> 
            <SearchBar
            />
          </div>
          <div className="container container--full px-4 my-5">
            <div className="row">
              {titles.map(item => (
                <TitleItem key={item.id} title={item} />
              ))}
            </div>
          </div>
        </div>
    );
  }
}

export default withRouter(TitlesResults);
