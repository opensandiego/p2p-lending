/* eslint-disable no-console */
import React, { Component } from "react";
import * as api from "../backendCalls";
import NotFound from "../../components/NotFound";

const ReqUser = ComposedComponent => {
  class FetchUser extends Component {
    
    state = { user: {}, isLoading: false, isError: false };

    componentDidMount() {

      if(this.state.user != {}) {
        // eslint-disable-next-line react/prop-types
        const { username } = this.props.match.params;
        if (username) {
          this.fetchUserProfile(username);
        }
      }
    }

    fetchUserProfile = username => {
      this.setState({ isLoading: true });
      api
        .fetchUserProfile(username)
        .then(({ data }) => this.setState({ user: data, isLoading: false }))
        .catch(() => this.setState({ isError: true, isLoading: false }));
    };

    render() {
      const { user, isLoading, isError } = this.state;

      if (isLoading) {
        return (
          <div className="container my-5">
            <i className="fas fa-spinner fa-spin mr-1" />
            Loading profile...
          </div>
        );
      }
      if (isError || (!isLoading && Object.keys(user).length === 0)) {
        return <NotFound />;
      }
      return <ComposedComponent {...this.props} user={user} />;
    }
  }

  return FetchUser;
};

export default ReqUser;
