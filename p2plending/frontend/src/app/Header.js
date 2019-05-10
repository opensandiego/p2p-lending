import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";


import Octicon from "../components/Octicon";
import LoginModal from "./auth/LoginModal";


class Header extends Component {
  state = {
    showModal: false,
    content: [],
    isLoading: true,
  };

  onOpenModal = () => this.setState({ showModal: true });

  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const isHomePage = this.props.location.pathname === "/";

    return (
      <div className="header">
        <LoginModal isOpen={this.state.showModal} onClose={this.onCloseModal} />
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

                <li className="list-inline-item ml-2" key={1}>
                  <button
                    className="btn btn-sm btn-outline-dark d-flex px-3 py-2"
                    onClick={() => {
                      this.onOpenModal();
                    }}
                  >
                    <small className="font-weight-bold">LOG IN</small>
                  </button>
                </li>
                <li className="list-inline-item ml-1" key={2}>
                  <button
                    className="btn btn-sm btn-dark d-flex px-3 py-2"
                    onClick={() => { 
                      this.onOpenModal();
                    }}
                  >
                    <small className="font-weight-bold">SIGN UP</small>
                  </button>
                </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
