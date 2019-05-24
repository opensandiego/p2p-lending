/* eslint-disable no-console */
import React, { Component } from "react";
import * as api from "../backendCalls";
import SearchBar from "../../components/SearchBar";

class TitleIndividual extends Component {
  static defaultProps = { match: { params: {} } };

  state = {
    searchString: "",
    title: {}
  }
  componentDidMount(){
    // eslint-disable-next-line react/prop-types
    const { params } = this.props.match;
    if (params.titleID != undefined ) {
      api.fetchContentTitle(params.titleID).then(({ data }) => {
        this.setState({ title: data[0], searchString: params.titleID  });
      });
    }
  }
  render() {
    const { title } = this.state
    console.log(title);
    return (
        <div id="container p-4 my-5">

          <div
            className="opening-blurb border rounded p-4 text-center text-white bg-success"
          >
            <span role="img" aria-label="emoji" style={{fontSize: 50}}>
              📖
            </span>
            <h2 className="m-0">{ title.title }</h2>
          </div>
          <div className="flex-container pt-2"> 
            <SearchBar
            />
          </div>
          <div className="title-item-individual col my-3 d-flex mb-3 justify-content-md-center">
            <div 
              className="item-link border bg-white text-center rounded w-100 d-flex flex-column p-3 position-relative"
              style= {{ maxWidth: "600px"}}
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
                <span className="text-secondary my-2">{title.description}</span>
                :(
                <span className="text-secondary my-2">No Description</span>
              )}
              {title.language && (
                <div
                  className="position-absolute d-flex align-items-center"
                  style={{ bottom: "16px", right: "18px" }}
                >
                  <div className="badge badge-primary ml-1 p-0">
                    <div className="text-uppercase p-1">{title.language}</div>
                  </div>
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
            </div>
          </div>
        </div>
    );
  }
}

export default TitleIndividual;
