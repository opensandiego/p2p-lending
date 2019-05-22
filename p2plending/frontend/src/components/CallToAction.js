import React, { Component }  from "react";
import SignupModal from "../app/auth/SignupModal";

class CallToAction extends Component {
  state = {
    showSignupModal: false,
  };

  onOpenSignupModal = () => this.setState({ showSignupModal: true });

  onCloseSignupModal = () => {
    this.setState({ showSignupModal: false });
  };

  render() {

    return (
      <div className="container my-2 py-1 bg-secondary text-center" style={{ maxWidth: "400px" }}>
        <SignupModal isOpen={this.state.showSignupModal} onClose={this.onCloseSignupModal} />
        <div className="row justify-content-md-center ">
          <div className="col "  style={{ maxWidth: "400px" }}>
            <p className="h5 text-white my-0" style={{ fontWeight: "500" }}>
              Have books you would want to share?
            </p>
            <p className="h5 text-white my-0" style={{ fontWeight: "500" }}>
              Sign up and become a Lender today!
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button  
              className="btn btn-md btn-primary my-3"
              onClick={() => { 
                this.onOpenSignupModal();
              }}
            >
              Sign Up - It&apos;s Free!
            </button>
          </div>
        </div>
      </div>
    );
  }
}
  
  export default CallToAction;