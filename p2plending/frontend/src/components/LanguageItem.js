import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { getFlagEmoji } from "./componentUtils/getFlag";

class LanguageItem extends Component {
  
  static propTypes = {
    name: PropTypes.string,
    number: PropTypes.number,
    code: PropTypes.string,
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
          <img  style={{paddingRight: 5}} alt="" height="16" width="22" src={getFlagEmoji(this.props.code)} /> 
             {this.props.name}{" "}({ this.props.number })
          </div>
        </Link>
      </div>
    );
  }

}


export default LanguageItem;
