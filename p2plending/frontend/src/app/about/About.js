import React, { Component } from "react";
import overview from '../../assets/p2pOverviewDiagram.gif';
import { Link } from "react-router-dom";

const config = require("../../../config/index");
const title = config.title;
const absTopLeft = {top: 70, left: 10}

function About() {
  return (
    <div id="container p-4 my-3">
      <div className="text-center p-4 text-white bg-info" >
        <Link to="/" className="btn btn-outline-dark btn-sm position-absolute border bg-info" style={absTopLeft}>
            <i className="fa fa-arrow-circle-left"></i>
            &nbsp; Back
        </Link>
        <span role="img" aria-label="emoji" style={{ fontSize: 50 }}>
          📖
        </span>
          <h2 className="m-0">{ title }</h2>
        <div className="mx-auto" style={{ maxWidth: "500px" }}>
          <span>
            {title} is a Peer to Peer Book Exchange! Share and explore the books within your local community.{" "}
            <span role="img" aria-label="Globex emoji">
              🌎
            </span>
          </span>
        </div>
      </div>
      <div className="p-4 rounded " >
        <dl>
          <dt>Overview:</dt>
          <dd>- The P2P Library Exchange facilitates a way for Lenders to securely loan their books and other media to people who are interested in borowing these books and other media. The local library along with it's staff provides a means to safely and securley accomplih this goal as shown in the following diagram. </dd>
          <p><img src={overview} className="img-fluid mx-auto" alt="Overview Diagram" /></p>
          <dt>Current situation:</dt>
          <dd>- There are individuals and companies that have collections of books and other media that in many case are just "gathering dust". Meanwhile these books and 
            media could enrich the lives and enjoyment of others.</dd>
          <dt>An opportunity to help:</dt>
          <dd>- We believe many individuals and companies will glady share their collections given an easy and safe way to so. Individuals wishing to borrow these shared collections in turn desire an easy way to locate and borrow this shared media.</dd>
          <dt>How the P2P Libary Lending system "Lendo" helps:</dt>
          <dd>- Lendo is a web accessible appplication that provides a way to bring collections to a library where library staff will record their receipt and deposit them into a secure repository. Items stored in the repository can then be searched via the web app and reserved for checkout. The library with it's staff provide a secure way to share books and other media and track the disposition of all media.</dd>
          <dt>Probable enhancements and future use cases:</dt>
          <dd>- Sharing of most any assets could benifit from this type of application.</dd>
        </dl>
      </div>
    </div>
  )
}

export default About;