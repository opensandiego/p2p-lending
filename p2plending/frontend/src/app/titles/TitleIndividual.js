/* eslint-disable no-console */
import React, { Component } from "react";
import queryString from "query-string";

class TitleIndividual extends Component {
  state = {
    searchString: "",
    title: []
  }
  componentDidMount(){
    // eslint-disable-next-line react/prop-types
    const values = queryString.parse(this.props.location.titles)

    if (values != undefined ) {
      this.setState({ searchString: Object.keys(values)[0] })
    }
  }
  render() {
    const { searchString } = this.state
    return (
        <div id="container p-4 my-5">

          <div
            className="opening-blurb border rounded p-4 text-center text-white bg-success"
          >
            <span role="img" aria-label="emoji" style={{fontSize: 50}}>
              📖
            </span>
            <h2 className="m-0">Specific Title Results Page for { searchString }</h2>
            <div className="mx-auto" style={{ maxWidth: "500px" }}>

            </div>
          </div>

        </div>
    );
  }
}

export default TitleIndividual;
