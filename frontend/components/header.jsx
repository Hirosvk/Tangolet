const React = require('react');
const CurrentUserStore = require('../stores/current_user_store');
const SessionActions = require('../actions/session_actions');
const hashHistory = require('react-router').hashHistory;

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

  loginStatus(){
    if (this.state.currentUser.id) {
      return (
        <div className="login_status">
          <p className="item">Hello {this.state.currentUser.username}</p>
          <button onClick={this.logout} className="item">Logout</button>
        </div>
      );
    } else {
      return (
        <div className="login_status">
          <p className="item">You are not logged in</p>
          <button className="item" onClick={this.toLogin}>Login</button>
          <button className="item" onClick={this.toSignup}>Sign up</button>
        </div>
      );
    }
  },

  backToIndex(){
    hashHistory.push("/");
  },

  render(){
    return (
      <header className="header">
        <a onClick={this.backToIndex}>Back to Index</a>
        {this.loginStatus()}
      </header>
    );
  }
});

module.exports = Header;
