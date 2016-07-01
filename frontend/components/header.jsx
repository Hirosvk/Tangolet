const React = require('react');
const CurrentUserStore = require('../stores/current_user_store');
const SessionActions = require('../actions/session_actions');
const hashHistory = require('react-router').hashHistory;
const Button = require('react-bootstrap').Button;

const Header = React.createClass({
  getInitialState(){
    return ({currentUser: CurrentUserStore.getCurrentUser()});
  },

  componentDidMount(){
    CurrentUserStore.addListener(this.userChange);
  },

  userChange(){
    this.setState({currentUser: CurrentUserStore.getCurrentUser()});
  },

  logout(){
    SessionActions.logout();
  },

  toLogin(){
    hashHistory.push("/login");
  },

  toSignup(){
    hashHistory.push("/signup");
  },

  userAccount(){
    if (this.state.currentUser.id) {
      return (
        <div className="user_account">
          <p className="item">Hello {this.state.currentUser.username}</p>
          <Button className="btn" onClick={this.logout} bsSize="xsmall">Logout</Button>
        </div>
      );
    } else {
      return (
        <div className="user_account">
          <p className="item">You are not logged in</p>
          <Button className="btn" bsSize="xsmall" onClick={this.toLogin}>Login</Button>
          <Button className="btn" bsSize="xsmall" onClick={this.toSignup}>Sign up</Button>
        </div>
      );
    }
  },

  backToIndex(){
    hashHistory.push('/');
  },

  render(){
    return (
      <header className="top-header">
        <Button onClick={this.backToIndex} bsSize="xsmall">Back to Index(dev.)</Button>
        {this.userAccount()}
      </header>
    );
  }
});

module.exports = Header;
