/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import * as api from "../backendCalls";
import StatusCard from "../orderstatus/StatusCard";

class RequestSection extends Component {

  state = { 
    requests: [], 
    isLoading: false, 
    isError: false 
  };

  componentDidMount() {
      this.fetchRequestInfo();
  }

  fetchRequestInfo = () => {
    this.setState({ isLoading: true });
    api
      .fetchRequestInfo()
      .then(({ data }) => this.setState({ requests: data, isLoading: false }))
      .catch(() => this.setState({ isError: true, isLoading: false }));
  };

  render(){
    const { requests, isLoading } = this.state;

    return (
      <div>
        <div className="page-header">
          <h2>Requested Items</h2>
        </div>
        <p className="lead"></p>
        <hr></hr>
        <div className="row">
          <div className="col-lg-12">
            <div className="m-1 w-100 h-100" style={{ background: "#f9f9f9", border: "1px solid #e8e8e8" }}>
            {isLoading === false && (
                <div>
                  {requests
                    ? [
                        <div className="container container--full px-4 my-5" key={1}>
                          <div className="row">
                            {requests.map(item => (
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
                    Loading Requests...
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

export default RequestSection;
