/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import RegisterLenderModal from "../auth/RegisterLenderModal";
import * as api from "../backendCalls";
import StatusCard from "../orderstatus/StatusCard";

class LentSection extends Component {
  state = {
    showRegisterLenderModal: false,
    lent_items: [], 
    isLoading: false, 
    isError: false 
  };

  onOpenRegisterLenderModal = () => this.setState({ showRegisterLenderModal: true });

  onCloseRegisterLenderModal = () => {
    this.setState({ showRegisterLenderModal: false });
  };

  componentDidMount() {
      this.fetchLendingInfo();
  }

  fetchLendingInfo = () => {
    this.setState({ isLoading: true });
    api
      .fetchLendingInfo()
      .then(({ data }) => this.setState({ lent_items: data, isLoading: false }))
      .catch(() => this.setState({ isError: true, isLoading: false }));
  };

  render() {
    const { is_lender } = this.props;
    const { lent_items, isLoading } = this.state;

    return (
      <div>
        <RegisterLenderModal isOpen={this.state.showRegisterLenderModal} onClose={this.onCloseRegisterLenderModal} />
        <div className="page-header">
            <h2>Items You Have Lent</h2>
          </div>
          <p className="lead"></p>
          <hr></hr>
          <div className="row">
            <div className="col-lg-12">
              {is_lender === false && (
                <div>
                  <h5>It doesn&apos;t seem like you are an approved lender yet. Interested in Lending items in 
                    your personal collection?</h5>
                  <div className="row">
                    <div className="col">
                      <button  
                        className="btn btn-md btn-primary my-3"
                        onClick={() => { 
                          this.onOpenRegisterLenderModal();
                        }}
                      >
                        Register - It&apos;s Free!
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {is_lender && (
                <div>
                  {isLoading === false && (
                    <div>
                      {lent_items
                        ? [
                            <div className="container container--full px-4 my-5" key={1}>
                              <div className="row">
                                {lent_items.map(item => (
                                  <StatusCard key={item.title.id} title={item.title} status={item.status} due_date={item.due_date} start_date={item.start_date} />
                                ))}
                              </div>
                            </div>,
                          ]
                        : [
                          <div className="container my-5" key={1}>
                            You currently have no lent items.
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
              )}   

            </div>
          </div>
      </div>
    );
  }
}

export default LentSection;
