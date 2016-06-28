const React = require('react');
const SessionActions = require('../actions/session_actions');
const CurrentUserStore = require('../stores/current_user_store');
const ErrorStore = require('../stores/error_store');
const hashHistory = require('react-router').hashHistory;


const LoginForm = React.createClass({
  getInitialState(){
    return ({error: ErrorStore.full_errors()});
  },

  componentWillMount(){
    ErrorStore.resetErrors();
  },

  componentDidMount(){
    this.currentUserStoreListener = CurrentUserStore.addListener(this.redirectToIndex);
    this.errorStoreListener = ErrorStore.addListener(this.receiveErrors);
  },

  componentWillUnmount(){
    this.currentUserStoreListener.remove();
    this.errorStoreListener.remove();
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
    let credentials = {
      username: this.refs.username.value,
      password: this.refs.password.value
    };
    SessionActions.login(credentials);
  },

  showErrors(){
    console.log(this.state.error);
    if (this.state.error.responseText){
      return (
        <ul className="errors">
          <li>{this.state.error.responseText}</li>
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

        <button>Login</button>
      </form>
    );
  }

});

module.exports = LoginForm;
window.LoginForm = LoginForm;
