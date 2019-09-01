/* eslint-disable no-console */
import React, { Component } from "react";

import DeleteAccountModal from "./DeleteAccountModal";
import LoginModal from "../auth/LoginModal";
import * as api from "../backendCalls";

const config = require("../../../config/index");
const title = config.title;
const ERRORS = { REQUIRED: "Required", INVALID: "Invalid" };

class Settings extends Component {
  state = {
    showModal: false,
    showLoginModal: false,
    isSuccess: false,
    user: { name: "", email: "", username: "", phone: "", primary_location: "1", preferred_language: null, email_notifications: false, sms_notifications: false, inapp_notifications: false   },
    errors: { email: undefined, name: undefined, phone: undefined },
  };

  // Lifecylce methods
  componentDidMount() {
    /*
      when we get to the Preferences/Settings page, we should check User Profile data 
      stored in the backend so we can update the appropriate fields
    */
    this.fetchUserProfile();
  }

  // Validation helpers
  validateUsername = username => {
    const illegalChars = /\W/; // allow letters, numbers, and underscores
    const isValid = !illegalChars.test(username) && username.length >= 4 && username.length <= 15;
    const validMessage = !isValid ? ERRORS.INVALID : undefined;
    return username.length === 0 ? ERRORS.REQUIRED : validMessage;
  };

  validateEmail = email => {
    const isValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    const validMessage = !isValid ? ERRORS.INVALID : undefined;
    return email.length === 0 ? ERRORS.REQUIRED : validMessage;
  };

  validateName = name => {
    return name.length === 0 ? ERRORS.REQUIRED : undefined;
  };

  validatePhone = phone => {
    const illegalChars = /\D/; // allow numbers only
    const isValid = !illegalChars.test(phone) && phone.length >= 7 && phone.length <= 14;
    const validMessage = !isValid ? ERRORS.INVALID : undefined;
    return phone.length === 0 ? ERRORS.REQUIRED : validMessage;
  };

  // Event listeners
  onOpenModal = () => this.setState({ showModal: true });

  onCloseModal = () => this.setState({ showModal: false });

  onCloseLoginModal = () => this.props.history.push("/");

  onChange = e =>
    this.setState({ user: { ...this.state.user, [e.target.name]: e.target.value } });

  onToggle = field =>
    this.setState(({ user }) => ({ user: { ...user, [field]: !user[field] } }));

  onSubmit = e => {
    e.preventDefault();

    const { user, errors } = this.state;
    const { email, name, username, phone } = user;

    this.setState(
      {
        errors: {
          ...errors,
          username: this.validateUsername(username || ""),
          email: this.validateEmail(email || ""),
          name: this.validateName(name || ""),
          phone: this.validatePhone(phone || ""),
        },
        isLoading: true,
        isSuccess: false,
      },
      () => this.updateUserProfile(),
    );
  };

  // API methods
  fetchUserProfile = () => {
    api
      .fetchUserProfile()
      .then(({ data }) => this.setState({ user: data, isLoading: false }))
      .catch(() => this.setState({ isError: true, isLoading: false }));
  };

  updateUserProfile = () => {
    const { user, errors } = this.state;
    if (!errors.phone && !errors.email && !errors.name && !errors.username) {
      api.updateUserProfile(user);
    } else {
      this.setState({ isLoading: false, isSuccess: false });
    }
  };

  deleteUserProfile = () => {
    api.deleteUserProfile()
  };

  handleError = error => {
    const { status } = error.response;
    this.setState({
      errors: { ...this.state.errors, form: error },
      showLoginModal: status === 401,
      isLoading: false,
      isSuccess: false,
    });
  };

  render() {
    const { user, errors, isLoading, isSuccess } = this.state;
    console.log(user)
    return (
      <div className="container container--narrow my-5 px-4">
        <DeleteAccountModal
          isOpen={this.state.showModal}
          onCancel={this.onCloseModal}
          onConfirm={this.deleteUserProfile}
        />
        <LoginModal isOpen={this.state.showLoginModal} onClose={this.onCloseLoginModal} />
        <h1 className="mb-4">Settings</h1>
        <form onSubmit={this.onSubmit} className="border rounded px-3 py-4 mb-3">
          <h5 className="font-weight-light py-1">My Preferences</h5>
          <hr />
          <div className="row mt-5">
            <div className="col-sm-2 col-lg-1">
              <small className={errors.name ? "text-danger" : "text-muted"}>Name</small>
            </div>
            <div className="col-sm-10 col-lg-11">
              <div className="d-flex align-items-center">
                <input
                  name="name"
                  onChange={this.onChange}
                  className="small border-0 py-2 w-100"
                  value={user.name}
                />
                {errors.name && (
                  <small className="text-danger text-uppercase ml-2 shake--error">
                    {errors.name}
                  </small>
                )}
              </div>
              <hr className={errors.name ? "border-danger" : ""} />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2 col-lg-1">
              <small className={errors.email ? "text-danger" : "text-muted"}>Email</small>
            </div>
            <div className="col-sm-10 col-lg-11">
              <div className="d-flex align-items-center">
                <input
                  className="small border-0 py-2 w-100"
                  type="email"
                  name="email"
                  onChange={this.onChange}
                  value={user.email}
                />
                {errors.email && (
                  <small className="text-danger text-uppercase ml-2 shake--error">
                    {errors.email}
                  </small>
                )}
              </div>
              <hr className={errors.email ? "border-danger" : ""} />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2 col-lg-1">
              <small className={errors.username ? "text-danger" : "text-muted"}>Username</small>
            </div>
            <div className="col-sm-10 col-lg-11">
              <div className="d-flex align-items-center">
                <input
                  className="small border-0 py-2 w-100"
                  name="username"
                  onChange={this.onChange}
                  value={user.username}
                />
                {errors.username && (
                  <small className="text-danger text-uppercase ml-2 shake--error">
                    {errors.username}
                  </small>
                )}
              </div>
              <hr className={errors.username ? "border-danger" : ""} />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2 col-lg-1">
              <small className={errors.phone ? "text-danger" : "text-muted"}>Phone Number</small>
            </div>
            <div className="col-sm-10 col-lg-11">
              <div className="d-flex align-items-center">
                <input
                  className="small border-0 py-2 w-100"
                  name="phone"
                  onChange={this.onChange}
                  value={user.phone}
                />
                {errors.phone && (
                  <small className="text-danger text-uppercase ml-2 shake--error">
                    {errors.phone}
                  </small>
                )}
              </div>
              <hr className={errors.phone ? "border-danger" : ""} />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2 col-lg-1">
              <small className="text-muted">Notifications</small>
            </div>
            <div className="col-sm-10 col-lg-11">
              <div className="d-flex align-items-center my-1">
                <input
                  className="small border-0 py-2"
                  type="checkbox"
                  name="email_notifications"
                  onChange={() => this.onToggle("email_notifications")}
                  checked={user.email_notifications}
                />
                <label className="ml-2 small m-0 text-muted font-weight-medium">
                  Receive E-mail Notifications about order statuses
                </label>
              </div>
              <div className="d-flex align-items-center my-1">
                <input
                  className="small border-0 py-2"
                  type="checkbox"
                  name="sms_notifications"
                  onChange={() => this.onToggle("sms_notifications")}
                  checked={user.sms_notifications}
                />
                <label className="ml-2 small m-0 text-muted font-weight-medium">
                  Receive Text Notifications about order statuses
                </label>
              </div>
              <div className="d-flex align-items-center my-1">
                <input
                  className="small border-0 py-2"
                  type="checkbox"
                  name="inapp_notifications"
                  onChange={() => this.onToggle("inapp_notifications")}
                  checked={user.inapp_notifications}
                />
                <label className="ml-2 small m-0 text-muted font-weight-medium">
                  Receive In-App Notifications about order statuses
                </label>
              </div>
              <hr />
            </div>
          </div>
          <div className="d-flex align-items-center mt-2">
            <button
              className="btn btn-outline-primary btn-sm font-weight-medium px-2"
              type="submit"
              disabled={isLoading}
            >
              Update my profile
            </button>
            {(errors.name || errors.email || errors.username || errors.form) && (
              <small className="text-uppercase text-danger ml-2">
                Oh-oh! There has been an error...
              </small>
            )}
            {isLoading && (
              <small className="text-uppercase text-muted ml-2">
                Saving...
              </small>
            )}
            {isSuccess && (
              <small className="text-uppercase text-muted ml-2">
                Updated!
              </small>
            )}
          </div>
        </form>
        <div className="border rounded p-3 d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between">
          <div className="d-flex flex-column justify-content-center">
            <span className="font-weight-medium m-0">Delete my account</span>
            <span className="text-muted small">
              Need a break from { title }? You can remove your account here.
            </span>
          </div>
          <button onClick={this.onOpenModal} className="btn btn-sm btn-outline-danger px-2 my-2">
            Delete account
          </button>
        </div>
      </div>
    );
  }
}

export default Settings;
