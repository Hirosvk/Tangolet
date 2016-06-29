const React = require('react');
const SessionActions = require('../actions/session_actions');
const CurrentUserStore = require('../stores/current_user_store');
const ErrorStore = require('../stores/error_store');
const hashHistory = require('react-router').hashHistory;


const SignupForm = React.createClass({
  getInitialState(){
    return ({error: ErrorStore.full_errors()});
  },

  componentDidMount(){
    this.currentUserStoreListener = CurrentUserStore.addListener(this.redirectToIndex);
    this.errorStoreListener = ErrorStore.addListener(this.receiveErrors);
  },

  componentWillUnmount(){
    this.currentUserStoreListener.remove();
    this.errorStoreListener.remove();
    ErrorStore.resetErrors();
  },

  redirectToIndex(){
    if (CurrentUserStore.getCurrentUser()){
      hashHistory.push("/");
    }
  },

  receiveErrors(){
    this.setState({error: ErrorStore.full_errors()});
  },

  login(event){
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
        <ul classNam="errors">
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
      <form onSubmit={this.login} className="session_form">
        {this.showErrors()}
        <label className="item">Username
        <input type="text" ref="username" /></label><br/>

        <label className="item">Password
        <input type="password" ref="password" /></label><br/>

        <label className="item">Email
        <input type="text" ref="email" /></label><br/>

        <button>Sign up</button>
      </form>
    );
  }

});

module.exports = SignupForm;
window.SignupForm = SignupForm;
