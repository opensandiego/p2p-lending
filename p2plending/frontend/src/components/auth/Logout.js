import React from "react";
import * as localStorage from "../componentUtils/localStorage";
import { Redirect } from "react-router-dom";

class Logout extends React.Component {
  componentDidMount() {
    localStorage.setAuthKey(null);
  }

  render() {
    return <Redirect to="/" />;
  }
}

export default Logout;
