import React, { Component } from "react";
import SearchBar from "../../components/SearchBar";
import BrowseByLanguage from "../../components/BrowseByLanguage";
import CallToAction from "../../components/CallToAction";

const config = require("../../../config/index");

const title = config.title;

class Titles extends Component {
  render() {
    return (
        <div id="container p-4 my-3">

          <div
            className="opening-blurb border rounded p-4 text-center text-white"
            style={{ background: "#2a2f35", borderBottom: "1px solid #e8e8e8" }}
          >
            <span role="img" aria-label="emoji" style={{fontSize: 50}}>
              📖
            </span>
            <h2 className="m-0">{ title }</h2>
            <div className="mx-auto" style={{ maxWidth: "500px" }}>
              <span>
                { title } is a Peer to Peer Book Exchange! Share and explore the books within your local community.{" "}
                <span role="img" aria-label="Tada emoji">
                  📚
                </span>
              </span>
            </div>
          </div>

          <div className="flex-container pt-2"> 
            <SearchBar />
          </div>
          <div className="mt-2">
            <BrowseByLanguage />
          </div>
          <div
            className="opening-blurb border rounded p-3 my-5 text-center text-white bg-secondary "
            style={{ borderBottom: "1px solid #e8e8e8" }}
          >
            <div className="mx-auto " style={{ maxWidth: "400px" }}>
              <CallToAction />
            </div>
          </div>
        </div>
    );
  }
}

export default Titles;
