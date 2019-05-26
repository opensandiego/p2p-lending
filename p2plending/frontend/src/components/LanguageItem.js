import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class LanguageItem extends Component {
  
  static propTypes = {
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  }

  getFlagEmoji(lang) {
    const emojiPath = "https://github.githubassets.com/images/icons/emoji/unicode/";
    switch(lang) {
      case 'English':
        return `${emojiPath}1f1ec-1f1e7.png`
      case 'Spanish':
        return `${emojiPath}1f1ea-1f1f8.png`
      case 'Chinese':
        return `${emojiPath}1f1e8-1f1f3.png`
      case 'Korean':
        return `${emojiPath}1f1f0-1f1f7.png`
      case 'Japanese':
        return `${emojiPath}1f1ef-1f1f5.png`
      case 'Russian':
        return `${emojiPath}1f1f7-1f1fa.png?` 
      default:
        return '⚈';
    }
  }
  
  render() {
    
    return (
      <div className="deck-item col-4 col-sm-3 col-lg-3 d-flex">
        <Link
          to={`/language/${this.props.name.toString().toLowerCase()}`}
          className=""
          style={{ fontSize: "14px" }}
        >
          <div style={{ textDecoration: "underline" }}>
          <img alt={this.props.name} height="15" width="15" src={this.getFlagEmoji(this.props.name)} /> 
             <scan style={{paddingLeft: 5}}>{this.props.name}{" "}({ this.props.number })</scan>
          </div>
        </Link>
      </div>
    );
  }

}


export default LanguageItem;
