const React = require('react');
const SessionActions = require('../actions/session_actions');
const CurrentUserStore = require('../stores/current_user_store');
const ErrorStore = require('../stores/error_store');
const Button = require('react-bootstrap').Button;

const SignupForm = React.createClass({
  getInitialState(){
    return ({error: ErrorStore.full_errors()});
  },

  componentDidMount(){
    this.currentUserStoreListener = CurrentUserStore.addListener(this.closeModal);
    this.errorStoreListener = ErrorStore.addListener(this.receiveErrors);
  },

  componentWillUnmount(){
    this.currentUserStoreListener.remove();
    this.errorStoreListener.remove();
    ErrorStore.resetErrors();
  },

  closeModal(){
    this.props.closeModal();
  },

  receiveErrors(){
    this.setState({error: ErrorStore.full_errors()});
  },

  signup(event){
    event.preventDefault();
    let userInfo = {
      username: this.refs.username.value,
      password: this.refs.password.value,
      email: this.refs.email.value
    };
    SessionActions.signup(userInfo);
  },

  showErrors(){
    if (this.state.error.responseJSON){
      return (
        <ul className="errors">
          {
            this.state.error.responseJSON.map( message => {
              return <li key={message}>{message}</li>;
            })
          }
        </ul>
      );
    }
  },

  render(){
    return(
      <form className="session_form">
        <h2 className="title">Welcome to Tangolet</h2>
        {this.showErrors()}
        <label className="item"><h2>Username
        <input type="text" ref="username" /></h2></label>

        <label className="item"><h2>Password
        <input type="password" ref="password" /></h2></label>

        <label className="item"><h2>Email
        <input type="text" ref="email" /></h2></label>

        <Button bsClass="btn" size="medium" onClick={this.signup}>Sign up</Button>
      </form>
    );
  }

});

module.exports = SignupForm;
window.SignupForm = SignupForm;
