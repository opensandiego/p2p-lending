import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getFlagEmoji } from "../../components/componentUtils/getFlag";

const flagStyle = {
  border: "1px solid lightgray", 
  objectFit: 'none'}

// eslint-disable-next-line react/prop-types
const TitleItem = ({ title }) => (
  <div className="title-item col-12 col-sm-6 col-md-4 col-lg-3 d-flex mb-3">
    <Link
      className="item-link bg-white text-center rounded w-100 d-flex flex-column p-3 position-relative"
      to={`/titles/${title.id}`}
    >
      <div className="title-image mb-2" >
        {title.cover_image ? 
          <img src={title.cover_image} />
        :(
          <span role="img" aria-label="emoji" style={{fontSize: 50}}>
            📖
          </span>
        )}

      </div>

      <h6 className="font-weight-medium text-dark m-1">{title.title}</h6>
      {title.author ? 
        <h6 className="font-weight-medium text-secondary m-1">{title.author}, {title.publish_year}</h6>
          :(
        <h6 className="font-weight-medium text-secondary m-1"></h6>
      )}
      {title.description ? 
        <span className="text-secondary my-2">{title.description.substr(0, 175)+'...'}</span>
        :(
        <span className="text-secondary my-2">No Description</span>
      )}
      {title.language && (
        <div
          className="position-absolute d-flex align-items-center"
          style={{ bottom: "10px", right: "18px" }}
        >
            <img alt="" height="30" width="48" ml-1 p-1 style={flagStyle} src={getFlagEmoji(title.language, 'flat/48')} />
        </div>
      )}
      <div
        className="position-absolute d-flex align-items-center"
        style={{ bottom: "16px", left: "18px" }}
      >
        <div className="badge badge-secondary ml-1 p-0">
          {title.media_type === "book" && (
            <div className="text-uppercase p-1"> 📗{title.media_type}</div>
          )}
          {title.media_type === "periodical" && (
            <div className="text-uppercase p-1"> 🗞️{title.media_type}</div>
          )}
        </div>
      </div>

    </Link>
  </div>
);

TitleItem.defaultProps = {
  title: PropTypes.any.isRequired
};

export default TitleItem;
