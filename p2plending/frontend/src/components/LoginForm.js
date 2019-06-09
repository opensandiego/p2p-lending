import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as api from "../app/backendCalls";

class LoginForm extends React.Component {
    state = {
      username: '',
      password: '',
      csrftoken: '',
      error: null
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
                console.log(data);
                // New CSRF token, TODO update as global
                this.setState({key: data.key});
                this.props.signalClose();
            }).catch( (error) => { 
                if(error.response){
                    console.log(error.response.data);
                    let msg = error.response.data.non_field_errors == undefined ?
                                error.response.data.detail : error.response.data.non_field_errors;
                    this.setState({error: msg});
                    console.log(this.state);
                }
            });
        event.preventDefault();
    }
  
    render() {
      let form_error;

      if(this.state.error){
        form_error = <div className="alert alert-danger" role="alert">{this.state.error}</div>
      }else {
        form_error = null;
      }

      return (
        <form onSubmit={this.handleSubmit}>
          {form_error} 
          <div className="text-right">
          <label >
            Username:{' '} 
            <input type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
          </label>
          <label>
            Name: {' '} 
            <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
          </label>
          </div>
          <button type="submit" class="btn btn-outline-dark m-2">Submit</button>
        </form>
      );
   }
}
export default LoginForm
