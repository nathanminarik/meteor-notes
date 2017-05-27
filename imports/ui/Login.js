import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

export class Login extends React.Component{
  constructor(props) {
    super (props);

    this.state = {
      error: ""
    };
  }

  login (e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    this.props.loginWithPassword({email}, password, (err) => {
      console.log('Callback: ', err)
      if (err) {
        this.setState({
          error: "Unable to login. Check email and password"
        });
      } else {
        this.setState({error: ""});
      }
    });
  }
  
  render(){
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Short Link</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.login.bind(this)} noValidate className="boxed-view__form">
            <input ref="email" type="email" name="email" placeholder="Email"/>
            <input ref="password" type="password" name="password" placeholder="Password"/>
            <button type="submit" className="button">Login</button>
          </form>

          <Link to="/signup">Need an account?</Link>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginWithPassword: PropTypes.func.isRequired
}

export default createContainer(() => {
  return {
    loginWithPassword: Meteor.loginWithPassword
  }
}, Login)