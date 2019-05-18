import React, { Component } from "react";
import { Link } from "react-router-dom";

const CallToAction = () => (
  <div className="container p-4">
    <Link to="/" className="text-dark d-flex align-items-center mb-2 ">
      <div className="text-center border border-primary rounded p-2" >
        <span style={{ fontSize: "30px" }} role="img" aria-label="embarrassed emoji">
          🔔
        </span>
        <p className="text-dark" style={{ fontWeight: "500" }}>
          Have books you would want to share? Sign up to become a Lender today.
        </p>
        <p className="text-dark pt-0" style={{ fontWeight: "700" }}>
          Click here to learn more.
        </p>
      </div>
    </Link>
  </div>
);

  
  export default CallToAction;