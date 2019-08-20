/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import RegisterLenderModal from "../auth/RegisterLenderModal";

class LentSection extends Component {
  state = {
    showRegisterLenderModal: false,
  };

  onOpenRegisterLenderModal = () => this.setState({ showRegisterLenderModal: true });

  onCloseRegisterLenderModal = () => {
    this.setState({ showRegisterLenderModal: false });
  };

  render() {
    const { lender_items, is_lender } = this.props;
    console.log(lender_items)
    
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

              {/* Actual Content Goes Here */}

            </div>
          </div>
      </div>
    );
  }
}

export default LentSection;
