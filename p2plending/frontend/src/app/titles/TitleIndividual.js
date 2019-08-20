/* eslint-disable no-console */
import React, { Component } from "react";
import * as api from "../backendCalls";
import SearchBar from "../../components/SearchBar";
import { withRouter }  from "react-router-dom";
import LoginModal from "../auth/LoginModal";
import SignupModal from "../auth/SignupModal";
import CallToAction from "../../components/CallToAction";
import { getFlagEmoji } from "../../components/componentUtils/getFlag";

import { hasParamInUrlChanged } from "../../components/componentUtils/routerUrls";
import * as localStorage from "../../components/componentUtils/localStorage";

class TitleIndividual extends Component {
  static defaultProps = { match: { params: {} } };
  state = {
    searchString: "",
    title: {},
    showLoginModal: false,
    showSignupModal: false,
    isLoggedIn: false,
  }
  onOpenLoginModal = () => this.setState({ showLoginModal: true });
  onOpenSignupModal = () => this.setState({ showSignupModal: true });

  onCloseLoginModal = () => {
    this.setState({ showLoginModal: false });
  };

  onCloseSignupModal = () => {
    this.setState({ showSignupModal: false });
  };

  goBack = () => {
    // eslint-disable-next-line react/prop-types
    this.props.history.goBack();
  };

  fetchTitleContentsAndUpdateState = () => {
    // eslint-disable-next-line react/prop-types
    const { params } = this.props.match;
    if (params.titleID != undefined ) {
      api.fetchContentTitle(params.titleID).then(({ data }) => {
        this.setState({ title: data[0], searchString: params.titleID  });
      });
    }
  };

  requestItem = () => {
    console.log(this.state.title);
  }

  componentDidUpdate(prevProps) {
    if (!hasParamInUrlChanged(prevProps.match, this.props.match, "titleID")) {
      return;
    }

    this.fetchTitleContentsAndUpdateState();
  }

  checkLoggedIn(){
    if(localStorage.getAuthKey()){
      this.setState({ isLoggedIn: true });
    }
    else{
      this.setState({ isLoggedIn: false });
    }
  }

  componentDidMount(){
    this.fetchTitleContentsAndUpdateState();
    this.checkLoggedIn();
  }

  render() {
    const { title, isLoggedIn } = this.state
    
    const flagStyle = {
      border: "1px solid lightgray", 
      objectFit: 'none'}

    return (
      <div id="container p-4 my-5">
        <LoginModal isOpen={this.state.showLoginModal} onClose={this.onCloseLoginModal} />
        <SignupModal isOpen={this.state.showSignupModal} onClose={this.onCloseSignupModal} />
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
        <div className="title-item-individual container my-3 d-flex mb-3 justify-content-md-center">
          <div 
            className="row item-link border bg-white rounded pb-5 w-100 text-center mx-auto position-relative"
            style= {{ maxWidth: "600px"}}
            >
            <div className="col-md-6">
              <div className="title-image mb-2 p-3" >
                <div className="bg-secondary rounded" style={{height: "300px"}}>
                {title.cover_image ? 
                  <img src={title.cover_image} />
                :(
                  <span role="img" className="span-img" aria-label="emoji" style={{fontSize: 80}}>
                    📖
                  </span>
                )}
                </div>
              </div>
            </div>
            <div className="col-md-6 text-left">
              <div className="row my-3">
                  <h3 className="font-weight-medium text-dark ml-1">{title.title}</h3>
              </div>
              <div className="row border">
                  {title.description ? 
                    <span className="text-dark my-2 px-2">
                      <h6 className="d-inline ">Description:</h6> <p className="d-inline">{title.description}</p>
                      </span>
                    :(
                    <span className="text-secondary my-2 px-2">No Description</span>
                  )}
              </div>
              <div className="row border">
                    {title.author && (
                      <span className="text-dark my-2 px-2">
                        <h6 className="d-inline">Author:</h6> <p className="d-inline">{title.author}</p>
                      </span>
                    )}
              </div>
              <div className="row border">
                  {title.publish_year && (
                    <span className="text-dark my-2 px-2">
                      <h6 className="d-inline">Year Published:</h6> <p className="d-inline">{title.publish_year}</p>
                      </span>
                  )}
              </div>
              <div className="row border">
                {title.language && (
                  <span className="text-dark my-2 px-2">
                    <h6 className="d-inline">Language:</h6> <p className="d-inline">{title.language}</p>
                  </span>
                )}
              </div>
            </div>
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
            {title.language && (
              <div
                className="position-absolute d-flex align-items-center"
                style={{ bottom: "15px", right: "18px" }}
              >
                <img alt="" height="20" width="32" ml-1 p-1 style={flagStyle} src={getFlagEmoji(title.language, 'flat/32')} />
              </div>
            )}
          </div>    
        </div>
        <div className="flex-container ">
          <div className="row">
            <div className="col"> 
              <button
                className="btn btn-outline-dark m-2"
                onClick={() => {
                  this.goBack();
                }}
              >
                <i className="fa fa-arrow-circle-left mr-1"></i>
                {''} Back
              </button>
            </div>
            <div className="col"> 
              {isLoggedIn === false && (
                <button
                  className="btn btn-outline-success m-2"  
                  onClick={() => {
                    this.onOpenLoginModal();
                  }}
                >
                  Request
                </button>
              )}
              {isLoggedIn === true && (
                <button
                  className="btn btn-outline-success m-2"  
                  onClick={() => {
                    this.requestItem();
                  }}
                >
                  Request
                </button>
              )}  
            </div>
          </div>
        </div>
        <div
            className="opening-blurb border rounded p-3 my-5 text-center text-white bg-secondary "
            style={{ borderBottom: "1px solid #e8e8e8" }}
          >
            <div className="mx-auto " style={{ maxWidth: "400px" }}>
              <CallToAction />
            </div>
          </div>
      </div>
    );
  }
}

export default withRouter(TitleIndividual);
