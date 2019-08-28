/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import * as api from "../backendCalls";
import StatusCard from "../orderstatus/StatusCard";

class LoansSection extends Component {

  state = { 
    loans: [], 
    isLoading: false, 
    isError: false 
  };

  componentDidMount() {
      this.fetchBorrowingInfo();
  }

  fetchBorrowingInfo = () => {
    this.setState({ isLoading: true });
    api
      .fetchBorrowingInfo()
      .then(({ data }) => this.setState({ loans: data, isLoading: false }))
      .catch(() => this.setState({ isError: true, isLoading: false }));
  };

  render() {
    const { loans, isLoading } = this.state;

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
              {isLoading === false && (
                <div>
                  {loans
                    ? [
                        <div className="container container--full px-4 my-5" key={1}>
                          <div className="row">
                            {loans.map(item => (
                              <StatusCard key={item.title.id} title={item.title} status={item.status} due_date={item.due_date} start_date={item.start_date} />
                            ))}
                          </div>
                        </div>,
                      ]
                    : [
                      <div className="container my-5" key={1}>
                        You currently have no loans
                      </div>,
                  ]}
                </div>
              )}
              {isLoading && (
                <div>
                  <div className="container my-5" key={1}>
                    <i className="fas fa-spinner fa-spin mr-1" />
                    Loading Loans...
                  </div>
                </div>
              )}    
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoansSection;
