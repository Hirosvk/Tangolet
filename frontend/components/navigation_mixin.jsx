const React = require('react');
const StudySetIndex = require('./study_set_index');
const KlassIndex = require('./klass_index');
const IndexActions = require('../actions/index_actions');
const CurrentUserStore = require('../stores/current_user_store');
const hashHistory = require('react-router').hashHistory;
const Modal = require('react-bootstrap').Modal;
const About = require('./about');

const Navigation = {
  getInitialState(){
    return({
      showLoginOption: false,
      showLogin: false,
      showSignup: false,
      demoCredentials: false
    });
  },

  redirectOrLogin(path){
    const loggedin = Boolean(CurrentUserStore.getCurrentUser().id);
    if (loggedin){
      hashHistory.push(path);
    } else {
      this.redirectTo = path;
      this.showLoginOption();
    }
  },

  toMyStudySets(){
    this.redirectOrLogin("?option=my_study_sets");
  },

  toMyKlasses(){
    this.redirectOrLogin("?option=my_classes");
  },

  toMyTestScores(){
    this.redirectOrLogin("my_test_scores");
  },

  toCreateStudySet(){
    this.redirectOrLogin("study_set_form");
  },

  toCreateClass(){
    this.redirectOrLogin("class_form");
  },

  toAbout(){
    this.redirectOrLogin("about");
  },

  toIndex(){
    hashHistory.push("/");
  },

  toLanguages(){
    hashHistory.push("?option=all_languages");
  },

  // toFirstStudySetDemo(){
  //   hashHistory.push("study_set/1");
  // },
  //
  // toFirstTeachingKlassDemo(){
  //   hashHistory.push("class/1");
  // },
  //
  // toFirstEnrolledKlassDemo(){
  //   hash
  // },

  showLoginOption(){
    this.setState({showLoginOption: true});
  },

  closeLoginOption(){
    this.setState({showLoginOption: false}, this.whereTo);
  },

  openLogin(){
    this.closeLoginOption();
    this.setState({showLogin: true, demoCredentials: false});
  },

  closeLogin(){
    this.setState({showLogin: false}, this.whereTo);
  },

  openSignup(){
    this.closeLoginOption();
    this.setState({showSignup: true});
  },

  closeSignup(){
    this.setState({showSignup: false}, this.whereTo);
  },

  whereTo(){
    let userListener = setTimeout(function(){
      if (CurrentUserStore.getCurrentUser().id){
        clearInterval(userListener);
        if (this.redirectTo) {
          hashHistory.push(this.redirectTo);
          this.redirectTo = undefined;
        }
      }
    }.bind(this), 100);
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
      <div className="session_form">
        <h2>Login is required for this feature</h2>
        <button className="btn" onClick={this.openLogin}>Login</button>
        <button className="btn" onClick={this.loginDemo}>Demo Login</button>
        <button className="btn" onClick={this.openSignup}>Sign up</button>
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

  modals(){
    return (
      <div>
        <Modal show={this.state.showLoginOption} onHide={this.closeLoginOption}>
          <Modal.Header closeButton />
          {this.loginOption()}
        </Modal>
        {this.modalSignup()}
        {this.modalLogin()}
      </div>
    );
  }

};

module.exports = Navigation;
