import React, { Component } from "react";

class TitlesResults extends Component {
  render() {
    return (
        <div id="container p-4 my-5">

          <div
            className="opening-blurb border rounded p-4 text-center "
            style={{ borderColor: "#e8e8e8" }}
          >
            <span role="img" aria-label="emoji" style={{fontSize: 50}}>
              📖
            </span>
            <h2 className="m-0">Results Page</h2>
            <div className="mx-auto" style={{ maxWidth: "500px" }}>
              <span>
                 Results Page
                <span role="img" aria-label="Tada emoji">
                  📚
                </span>
              </span>
            </div>
          </div>

        </div>
    );
  }
}

export default TitlesResults;
