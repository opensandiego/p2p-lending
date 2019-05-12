import React from "react";
import { Link } from "react-router-dom";

const config = require("../../config/index");

const title = config.title;

const Footer = () => (
  <div className="bg-dark">
    <div className="container container--full d-flex flex-column flex-md-row align-items-center justify-content-between p-4">
      <div className="text-secondary d-flex flex-column">
        <small className="font-weight-medium">{ title } © 2019</small>
      </div>

      <ul className="list-inline mb-0 text-center text-md-right">
        
        <li className="list-inline-item">
          <small>
            <Link to="/">
              About
            </Link>
          </small>
        </li>
        <li className="list-inline-item">
          <small>
            <Link to="/">
              Terms
            </Link>
          </small>
        </li>
        <li className="list-inline-item">
          <small>
            <Link to="/">
              Privacy
            </Link>
          </small>
        </li>
        <li className="list-inline-item">
          <small>
            <a href="mailto:hello@lendo.com">
              Contact
            </a>
          </small>
        </li>
      </ul>
    </div>
  </div>
);

export default Footer;
