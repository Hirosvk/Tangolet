const React = require('react');
const StudySetIndex = require('./study_set_index');
const KlassIndex = require('./klass_index');
const IndexActions = require('../actions/index_actions');
const CurrentUserStore = require('../stores/current_user_store');
const hashHistory = require('react-router').hashHistory;
const Modal = require('react-bootstrap').Modal;

const SideNavbar = React.createClass({

  getInitialState(){
    return({
      showLoginOption: false,
      showLogin: false,
      showSignup: false,
      demoCredentials: false
    });
  },

  ensureLogin(path){
    const loggedin = Boolean(CurrentUserStore.getCurrentUser().id);
    if (loggedin){
      hashHistory.push(path);
    } else {
      this.showLoginOption();
    }
  },

  toMyStudySets(){
    this.ensureLogin("?option=my_study_sets");
  },

  toMyKlasses(){
    this.ensureLogin("?option=my_classes");
  },

  toMyTestScores(){
    this.ensureLogin("my_test_scores");
  },

  toCreateStudySet(){
    this.ensureLogin("study_set_form");
  },

  toCreateClass(){
    this.ensureLogin("class_form");
  },

  toIndex(){
    hashHistory.push("/");
  },

  showLoginOption(){
    this.setState({showLoginOption: true});
  },

  closeLoginOption(){
    this.setState({showLoginOption: false});
  },

  openLogin(){
    this.closeLoginOption();
    this.setState({showLogin: true, demoCredentials: false});
  },

  closeLogin(){
    this.setState({showLogin: false});
  },

  openSignup(){
    this.closeLoginOption();
    this.setState({showSignup: true});
  },

  closeSignup(){
    this.setState({showSignup: false});
  },

  loginDemo(){
    this.closeLoginOption();
    let demoCredentials = {
      username: "Hiro",
      password: "hirohiro"
    };
    this.setState({
      showLogin: true,
      demoCredentials: demoCredentials
    });
  },

  loginOption(){
    return (
      <div>
        <button onClick={this.openLogin}>Login</button>
        <button onClick={this.loginDemo}>Demo Login</button>
        <button onClick={this.openSignup}>Sign up</button>
      </div>
    );
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
      <aside className="side-navbar">

        <Modal show={this.state.showLoginOption} onHide={this.closeLoginOption}>
          <Modal.Header closeButton />
          {this.loginOption()}
        </Modal>

        <button className="btn green-btn" onClick={this.toIndex}>Home</button>
        <button className="btn blue-btn" onClick={this.toMyKlasses}>My Classes</button>
        <button className="btn blue-btn" onClick={this.toMyStudySets}>My Study Sets </button>
        <button className="btn yellow-btn" onClick={this.toMyTestScores}>My Test Scores</button>
        <button className="btn orange-btn" onClick={this.toCreateClass}>Create Class</button>
        <button className="btn orange-btn" onClick={this.toCreateStudySet}>Create Study Set</button>
        <button className="btn pink-btn" >About</button>
      </aside>
    );
  }
});

module.exports = SideNavbar;
