import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as api from "../app/backendCalls";

class LoginForm extends React.Component {
    state = {
      username: '',
      password: '',
      csrftoken: ''
    }

    componentDidMount(){
      api.getCSRFToken().then( csrf => {
          this.setState({ csrftoken: csrf });
      });
    }

    handleOpen(){
    }
  
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }  

    handleSubmit = (event) => {
        api.submitLogin(this.state.username,this.state.password,this.state.csrftoken).then(
            ({ data }) => {
                console.log("Login Result",data);
                //this.setState({ content: data, isLoading: false });
            });
        event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
          </label>
          <label>
            Name:
            <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
   }
}
export default LoginForm
