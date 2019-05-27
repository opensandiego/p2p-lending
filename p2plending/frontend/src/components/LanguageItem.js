import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { getFlagEmoji } from "./componentUtils/getFlag";

class LanguageItem extends Component {
  
  static propTypes = {
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
  }
  
  render() {
    if(!this.props.name || !this.props.code || !this.props.number){
      return <div></div>
    }
    return (
      <div className="deck-item col-4 col-sm-3 col-lg-3 d-flex">
        <Link
          to={`/language/${this.props.name.toString().toLowerCase()}`}
          className=""
          style={{ fontSize: "14px" }}
        >
          <div style={{ textDecoration: "underline" }}>
          <img alt={this.props.name} height="15" width="15" src={getFlagEmoji(this.props.name)} /> 
             <scan style={{paddingLeft: 5}}>{this.props.name}{" "}({ this.props.number })</scan>
          </div>
        </Link>
      </div>
    );
  }

}


export default LanguageItem;
