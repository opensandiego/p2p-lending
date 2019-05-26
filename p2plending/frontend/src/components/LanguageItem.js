import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class LanguageItem extends Component {
  
  static propTypes = {
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  }

  getFlagEmoji(lang) {
    //const atribs =  'alt={lang} height="20" width="20"';
    switch(lang) {
      case 'English':
        return <img alt={lang} height="20" width="20"
                src= "https://github.githubassets.com/images/icons/emoji/unicode/1f1ec-1f1e7.png" />
      case 'Spanish':
        return <img alt={lang} height="20" width="20"
                src="https://github.githubassets.com/images/icons/emoji/unicode/1f1ea-1f1f8.png" />     
      case 'Chinese':
        return <img alt={lang} height="20" width="20"
                src="https://github.githubassets.com/images/icons/emoji/unicode/1f1e8-1f1f3.png?" />
      case 'Korean':
        return <img alt={lang} height="20" width="20"
                src="https://github.githubassets.com/images/icons/emoji/unicode/1f1f0-1f1f7.png?" />
      case 'Japanese':
      return <img alt={lang} height="20" width="20"
                src="https://github.githubassets.com/images/icons/emoji/unicode/1f1ef-1f1f5.png?" />   
      case 'Russian':
        return <img alt={lang} height="20" width="20"
                src="https://github.githubassets.com/images/icons/emoji/unicode/1f1f7-1f1fa.png?" />           
      default:
        return '⚈';
    }
  }
  
  render() {
    
    return (
      <div className="deck-item col-4 col-sm-3 col-md-4 col-lg-3 d-flex">
        {this.getFlagEmoji(this.props.name)}
        <Link
          to={`/language/${this.props.name.toString().toLowerCase()}`}
          className="d-flex flex-column justify-content-between text-dark mb-1 p-1 w-50 position-relative"
          style={{ fontSize: "14px" }}
        >
          <div style={{ textDecoration: "underline" }}>
             {this.props.name}&nbsp;({ this.props.number })
          </div>
        </Link>
      </div>
    );
  }

}


export default LanguageItem;
