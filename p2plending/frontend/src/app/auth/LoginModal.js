import React from "react";
import Modal from "react-modal";


import Octicon from "../../components/Octicon";

const config = require("../../../config/index");

const title = config.title;

Modal.setAppElement("#root");


const LoginModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} className="loginModal" overlayClassName="loginModal-overlay">
    <button className="loginModal-close btn btn-reset p-2" onClick={onClose}>
      <Octicon name="x" />
    </button>
    <div className="py-5 px-4 my-2 mx-auto" style={{ maxWidth: "400px" }}>
      <div className="text-center mx-auto">
        <h5 className="mb-1">Login to { title }</h5>
        <p className="text-secondary font-weight-light">
          Sign in to save your progress.
        </p>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <a
          className="loginModal-button btn btn-sm btn-outline-dark"
          href="http:google.com/"
        >
          <small className="font-weight-bold">Log in</small>
        </a>
      </div>
      <div className="text-center mt-2" style={{ opacity: 0.5 }}>
        <small className="text-muted">
          We'll never post to your account without your permission.
        </small>
      </div>
    </div>
  </Modal>
);

export default LoginModal;
