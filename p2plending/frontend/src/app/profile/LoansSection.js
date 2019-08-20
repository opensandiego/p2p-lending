/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { Component } from "react";


class LoansSection extends Component {

  render() {

    return (
      <div>
        <div className="page-header">
            <h2>Loaned Items</h2>
        </div>
        <p className="lead"></p>
        <hr></hr>
        <div className="row">
          <div className="col-lg-12">
            <div className="m-1 w-100 h-100" style={{ background: "#f9f9f9", border: "1px solid #e8e8e8" }}>
              Books that have gone from the requests to actually loaned out to the user will go here. 
              {/* Actual Content Goes Here */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoansSection;
