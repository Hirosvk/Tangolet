const React = require('react');
const SessionActions = require('../actions/session_actions');
const CurrentUserStore = require('../stores/current_user_store');
const ErrorStore = require('../stores/error_store');
const Button = require('react-bootstrap').Button;

const LoginForm = React.createClass({
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
    // if (CurrentUserStore.getCurrentUser()){
    //   hashHistory.push("/");
    // }
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
        <h2 className="title">Welcome Back</h2>
        {this.showErrors()}
        <label className="item"><h2>Username
        <input type="text" ref="username" /></h2></label>

        <label className="item"><h2>Password
        <input type="password" ref="password" /></h2></label>

        <Button bsClass='btn' size='medium' onClick={this.login} >Login</Button>
      </form>
    );
  }


});

module.exports = LoginForm;
window.LoginForm = LoginForm;
