import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import LoginModal from "./auth/LoginModal";
import SignupModal from "./auth/SignupModal";
import * as localStorage from "../components/componentUtils/localStorage";
import Tooltip from "rc-tooltip";

const OptionsToolTip = () => (
  <div className="tooltip-content">
    <div className="tooltip-item">
      <Link className="text-secondary" to={`/order-status`}>
        Order Status
      </Link>
    </div>
    <div className="tooltip-item">
      <Link className="text-secondary" to={`/settings/profile`} >
        Preferences
      </Link>
    </div>
    <hr className="m-0 my-1" />
    <div className="tooltip-item">
      <Link
        className="text-secondary"
        to="/logout"
      >
        Logout
      </Link>
    </div>
  </div>
);

const PlaceholderImage = () => (
  <div className="header-image d-flex align-items-center justify-content-center">
    <i className="fas fa-bars" />
  </div>
);

class Header extends Component {
  state = {
    showLoginModal: false,
    showSignupModal: false
  };

  onOpenLoginModal = () => this.setState({ showLoginModal: true });
  onOpenSignupModal = () => this.setState({ showSignupModal: true });

  onCloseLoginModal = () => {
    this.setState({ showLoginModal: false });
  };

  onCloseSignupModal = () => {
    this.setState({ showSignupModal: false });
  };

  render() {
    // If CSRF Token is in Local Storage then request user name/profile info
    // If both are present then you can display User Information Instead of Login/Signup Button
    const authenticated = localStorage.getAuthKey();

    return (
      <div className="header">
        <LoginModal isOpen={this.state.showLoginModal} onClose={this.onCloseLoginModal} />
        <SignupModal isOpen={this.state.showSignupModal} onClose={this.onCloseSignupModal} />
        <div className="container container--full d-flex justify-content-between align-items-center py-2 w-100">
        <div className="d-flex align-items-center">
              <Link
                to="/"
                className="d-flex align-items-center"
              >
                <span role="img" aria-label="emoji" style={{fontSize: 27}}>
                  📖
                </span>
              </Link>
          </div>
          <ul className="d-flex align-items-center p-0 m-0">
          {authenticated
              ? [
                  <li className="header-login list-inline-item ml-3" key={1}>
                    <Tooltip
                      placement="bottomRight"
                      trigger={["click"]}
                      overlay={<OptionsToolTip />}
                      id="header-logout"
                    >
                      <div className="position-relative">
                          <PlaceholderImage />
                      </div>
                    </Tooltip>
                  </li>,
                ]
              : [
                  <li className="list-inline-item ml-2" key={1}>
                    <button
                      className="btn btn-sm btn-outline-dark d-flex px-3 py-2"
                      onClick={() => {
                        this.onOpenLoginModal();
                      }}
                    >
                      <small className="font-weight-bold">LOG IN</small>
                    </button>
                  </li>,
                  <li className="list-inline-item ml-1" key={2}>
                    <button
                      className="btn btn-sm btn-primary d-flex px-3 py-2"
                      onClick={() => { 
                        this.onOpenSignupModal();
                      }}
                    >
                      <small className="font-weight-bold">SIGN UP</small>
                    </button>
                  </li>,
                ]
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
