// const StudySetIndex = require('./study_set_index');
// const KlassIndex = require('./klass_index');
// const IndexActions = require('../actions/index_actions');
// const CurrentUserStore = require('../stores/current_user_store');
// const hashHistory = require('react-router').hashHistory;
// const About = require('./about');
const React = require('react');
const Modal = require('react-bootstrap').Modal;
const Navigation = require('./navigation_mixin');

const SideNavbar = React.createClass({
  mixins: [Navigation],
  // getInitialState(){
  //   return({
  //     showLoginOption: false,
  //     showLogin: false,
  //     showSignup: false,
  //     demoCredentials: false
  //   });
  // },
  //
  // redirectOrLogin(path){
  //   const loggedin = Boolean(CurrentUserStore.getCurrentUser().id);
  //   if (loggedin){
  //     hashHistory.push(path);
  //   } else {
  //     this.showLoginOption();
  //   }
  // },
  //
  // toMyStudySets(){
  //   this.redirectOrLogin("?option=my_study_sets");
  // },
  //
  // toMyKlasses(){
  //   this.redirectOrLogin("?option=my_classes");
  // },
  //
  // toMyTestScores(){
  //   this.redirectOrLogin("my_test_scores");
  // },
  //
  // toCreateStudySet(){
  //   this.redirectOrLogin("study_set_form");
  // },
  //
  // toCreateClass(){
  //   this.redirectOrLogin("class_form");
  // },
  //
  // toAbout(){
  //   this.redirectOrLogin("about");
  // },
  //
  // toIndex(){
  //   hashHistory.push("/");
  // },
  //
  // showLoginOption(){
  //   this.setState({showLoginOption: true});
  // },
  //
  // closeLoginOption(){
  //   this.setState({showLoginOption: false});
  // },
  //
  // openLogin(){
  //   this.closeLoginOption();
  //   this.setState({showLogin: true, demoCredentials: false});
  // },
  //
  // closeLogin(){
  //   this.setState({showLogin: false});
  // },
  //
  // openSignup(){
  //   this.closeLoginOption();
  //   this.setState({showSignup: true});
  // },
  //
  // closeSignup(){
  //   this.setState({showSignup: false});
  // },
  //
  // loginDemo(){
  //   this.closeLoginOption();
  //   let demoCredentials = {
  //     username: "Hiro",
  //     password: "hirohiro"
  //   };
  //   this.setState({
  //     showLogin: true,
  //     demoCredentials: demoCredentials
  //   });
  // },
  //
  // loginOption(){
  //   return (
  //     <div className="session_form">
  //       <h2>Login is required for this feature</h2>
  //       <button className="btn" onClick={this.openLogin}>Login</button>
  //       <button className="btn" onClick={this.loginDemo}>Demo Login</button>
  //       <button className="btn" onClick={this.openSignup}>Sign up</button>
  //     </div>
  //   );
  // },
  //
  // modalLogin(){
  //   return (
  //     <Modal show={this.state.showLogin} onHide={this.closeLogin}>
  //       <Modal.Header closeButton />
  //       <LoginForm closeModal={this.closeLogin}
  //                   demo={this.state.demoCredentials}/>
  //     </Modal>
  //   );
  // },
  //
  // modalSignup(){
  //   return (
  //     <Modal show={this.state.showSignup} onHide={this.closeSignup}>
  //       <Modal.Header closeButton />
  //       <SignupForm closeModal={this.closeSignup}/>
  //     </Modal>
  //   );
  // },


  render: function(){
    return (
      <aside className="side-navbar">

        {this.modals()}

        <button className="btn blue-btn" onClick={this.toIndex}>Home</button>
        <button className="btn blue-btn" onClick={this.toLanguages}>Languages</button>
        <button className="btn green-btn" onClick={this.toMyKlasses}>My Classes</button>
        <button className="btn green-btn" onClick={this.toMyStudySets}>My Study Sets </button>
        <button className="btn yellow-btn" onClick={this.toMyTestScores}>My Test Scores</button>
        <button className="btn orange-btn" onClick={this.toCreateClass}>Create Class</button>
        <button className="btn orange-btn" onClick={this.toCreateStudySet}>Create Study Set</button>
        <button className="btn pink-btn" onClick={this.toAbout}>About</button>
      </aside>
    );
  }
});

module.exports = SideNavbar;
