const React = require('react');
const CurrentUserStore = require('../stores/current_user_store');
const SessionActions = require('../actions/session_actions');
const hashHistory = require('react-router').hashHistory;
const Button = require('react-bootstrap').Button;
const Modal = require('react-bootstrap').Modal;
const LoginForm = require('./login_form');
const SignupForm = require('./signup_form');
const SearchBar = require('./search_bar');

const Header = React.createClass({
  getInitialState(){
    return ({currentUser: CurrentUserStore.getCurrentUser(),
      showLogin: false,
      showSignup: false});
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

  openLogin(){
    this.setState({showLogin: true, demoCredentials: false});
  },

  loginDemo(){
    let demoCredentials = {
      username: "Hiro",
      password: "hirohiro"
    };
    this.setState({
      showLogin: true,
      demoCredentials: demoCredentials
    });
  },

  openSignup(){
    this.setState({showSignup: true});
  },

  userAccount(){
    if (this.state.currentUser.id) {
      return (
        <div className="user_account">
          <h3 className="item">Hello {this.state.currentUser.username}</h3>
          <Button bsClass="btn" onClick={this.logout} bsSize="xsmall">Logout</Button>
        </div>
      );
    } else {
      return (
        <div className="user_account">
          <h3 className="item">You are not logged in</h3>
          <Button bsClass="btn" bsSize="xsmall" onClick={this.openLogin}>Login</Button>

          <Button bsClass="btn" bsSize="xsmall" onClick={this.loginDemo}>Demo Login</Button>

          <Button bsClass="btn" bsSize="xsmall" onClick={this.openSignup}>Sign up</Button>
        </div>
      );
    }
  },

  closeLogin(){
    this.setState({showLogin: false});
  },

  closeSignup(){
    this.setState({showSignup: false});
  },

  modalLogin(){
    return (
      <Modal show={this.state.showLogin} onHide={this.closeLogin}>
        <Modal.Header closeButton />
        <LoginForm closeModal={this.closeLogin}
                    demo={this.state.demoCredentials}/>
      </Modal>
    );
  },

  modalSignup(){
    return (
      <Modal show={this.state.showSignup} onHide={this.closeSignup}>
        <Modal.Header closeButton />
        <SignupForm closeModal={this.closeSignup}/>
      </Modal>
    );
  },

  render(){
    return (
      <header className="top-header">
      <div>
        <h2>Tangolet</h2>
      </div>
      <SearchBar />
      {this.userAccount()}

      {this.modalLogin()}
      {this.modalSignup()}

      </header>
    );
  }
});

module.exports = Header;
