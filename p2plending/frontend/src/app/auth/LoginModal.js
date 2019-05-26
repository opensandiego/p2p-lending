/* eslint-disable react/prop-types */
import React from "react";
import Modal from "react-modal";
import { Link, withRouter } from "react-router-dom";

import Octicon from "../../components/Octicon";
import LoginForm from "../../components/LoginForm";


const config = require("../../../config/index");

const title = config.title;

Modal.setAppElement("#root");


const LoginModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} className="loginModal" overlayClassName="loginModal-overlay">
    <button className="loginModal-close btn btn-reset p-2" onClick={onClose}>
      <Octicon name="x" />
    </button>
    <div className="container">
      <div className="py-5 px-4 my-2 mx-auto" style={{ maxWidth: "400px" }}>
        <div className="text-center mx-auto">
          <h5 className="mb-1">Login to { title }</h5>
          <p className="text-secondary font-weight-light">
            Sign in to save your progress.
          </p>
        </div>
        <div className="row justify-content-md-center">
            <LoginForm></LoginForm>
        </div>
        <div className="text-center mt-2" style={{ opacity: 0.5 }}>
          <Link
            to="/privacy"
            className="d-flex align-items-center"
          >
          <small>
            We will never post to your account without your permission.
          </small>
          </Link>
        </div>
      </div>
    </div>
  </Modal>
);

export default withRouter(LoginModal);
