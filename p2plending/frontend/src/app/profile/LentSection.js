/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { Component } from "react";

class LentSection extends Component {

  render() {
    const { lender_items, is_lender } = this.props;
    console.log(lender_items)
    console.log(is_lender)
    return (
      <div>
            <div className="page-header">
                <h2>Items You Have Lent</h2>
              </div>
              <p className="lead"></p>
              <hr></hr>
              <div className="row">
                <div className="col-lg-12">
                  <div className="m-1 w-100 h-100" style={{ background: "#f9f9f9", border: "1px solid #e8e8e8" }}>
                    If the user is an approved lender they will be able to see what items they have lent out here. Otherwise we will present the user with a dialog
                    on how to become an approved lender
                    {/* Actual Content Goes Here */}
                  </div>
                </div>
              </div>
      </div>
    );
  }
}

export default LentSection;
