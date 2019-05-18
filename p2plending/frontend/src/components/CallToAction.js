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
      <div className="container my-5 border rounded bg-light text-dark text-center" style={{ maxWidth: "400px" }}>
        <SignupModal isOpen={this.state.showSignupModal} onClose={this.onCloseSignupModal} />
        <div className="row justify-content-md-center ">
          <div className="col col-md-auto "  style={{ maxWidth: "400px" }}>
            <p className="text-dark my-3" style={{ fontWeight: "900" }}>
              Have books you would want to share? Sign up and become a Lender today!
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <span style={{ fontSize: "40px" }} role="img" aria-label="embarrassed emoji">
              🔔
            </span>
          </div>
          <div className="col-md-auto">
            <button  
              className="btn btn-md btn-primary my-3"
              onClick={() => { 
                this.onOpenSignupModal();
              }}
            >
              Sign Up - It&apos;s free
            </button>
          </div>
        </div>
        {/* <div className="row justify-content-md-center my-2">

        </div> */}
      </div>
    );
  }
}
  
  export default CallToAction;