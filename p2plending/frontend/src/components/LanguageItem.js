import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class LanguageItem extends Component {
  
  static propTypes = {
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  }

  render() {
    
    return (
      <div className="deck-item col-4 col-sm-3 col-md-4 col-lg-3 d-flex">
        ⚈ <Link
          to={`/search/${this.props.name.toString().toLowerCase()}`}
          className="d-flex flex-column justify-content-between text-dark mb-1 p-1 w-50 position-relative"
          style={{ fontSize: "14px" }}
        >
          <div style={{ textDecoration: "underline" }}>
             {this.props.name}{" "}({ this.props.number })
          </div>
        </Link>
      </div>
    );
  }

}


export default LanguageItem;
