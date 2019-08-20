/* eslint-disable react/prop-types */
import React from "react";
import Modal from "react-modal";

import Octicon from "../../components/Octicon";
import MapContainer from "../../components/MapContainer";

const config = require("../../../config/index");

const title = config.title;

Modal.setAppElement("#root");

const RegisterLenderModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} className="loginModal" overlayClassName="loginModal-overlay">
    <button className="loginModal-close btn btn-reset p-2" onClick={onClose}>
      <Octicon name="x" />
    </button>
    <div className="container py-5 my-2 mx-auto" style={{ maxWidth: "400px" }}>
        <div className="row">
            <div className="col-sm pl-0 pr-1">
                <div className="col-sm p-0">
                    <h5 className="mb-1">Register as a Lender</h5>
                </div>
                <p className="text-secondary font-weight-light">
                    { title } is a community based peer to peer sharing application.
                    In order to register as a lender you must go to the nearest participating library
                    and opt into the system using your library card. Drop by and ask about being a lender for {" "} { title }
                </p>
            </div>
            <div className="col-md pl-1 text-center">
                <div style={{ height: "300px", width: '100%' }}>
                    <MapContainer/>
                </div>
            </div>
      </div>
    </div>
  </Modal>
);

export default RegisterLenderModal;
