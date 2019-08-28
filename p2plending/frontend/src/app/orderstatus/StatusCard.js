import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getFlagEmoji } from "../../components/componentUtils/getFlag";

const flagStyle = {
  border: "1px solid lightgray", 
  objectFit: 'none'}

class StatusCard extends Component {

  render() {
    // eslint-disable-next-line react/prop-types
    const { title, status, due_date, start_date } = this.props;
    const status_regex = status.replace(/-/g, ' ');
    // format due_date into a useable format
    let due_date_mod;

    if (due_date) {
      const end_date = new Date(due_date);
      if(start_date) {
        const begin_date = new Date(start_date);
        // const days_left = begin_date - end_date;
        const days_left = Math.round((end_date - begin_date)/(1000*60*60*24));
        if(days_left > 7) {
          due_date_mod = <span className="text-success my-2" > {days_left} Days Left </span>
        }
        else if (days_left > 3 && days_left < 7) {
          due_date_mod = <span className="text-warning my-2" > {days_left} Days Left </span>
        }
        else {
          due_date_mod = <span className="text-danger my-2" > {days_left} Days Left </span>
        }
      }

    }
    else{
      due_date_mod = <div></div>
    }

    return (
      <div className="title-item col-12 col-sm-6 col-md-4 col-lg-3 d-flex mb-3" style={{height: 250}}>
        <Link
          className="item-link bg-white text-center rounded w-100 d-flex flex-column p-3 position-relative"
          to={`/titles/${title.id}`}
        >
          {title.description ?
            <div className="order-status-state"> 
              <span className="text-primary my-2 order-status-status" id={ status } > 
                { status_regex }
              </span>
              <div>
                  { due_date_mod }
              </div>
            </div>
            :(
            <span className="text-secondary my-2">No State Found</span>
          )}

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
          {title.language && (
            <div
              className="position-absolute d-flex align-items-center"
              style={{ bottom: "15px", right: "18px" }}
            >
              <img alt="" height="20" width="30" className="ml-1 p-1" style={flagStyle} src={getFlagEmoji(title.language, 'flat/32')} />
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
  }
}


export default StatusCard;
