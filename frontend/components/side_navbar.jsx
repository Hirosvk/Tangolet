const React = require('react');
const StudySetIndex = require('./study_set_index');
const KlassIndex = require('./klass_index');
const IndexActions = require('../actions/index_actions');
const CurrentUserStore = require('../stores/current_user_store');
const hashHistory = require('react-router').hashHistory;

const SideNavbar = React.createClass({

  loggedIn(){
    return Boolean(CurrentUserStore.getCurrentUser().id);
  },

  toMyStudySets(){
    if (this.loggedIn()){
      hashHistory.push("?option=my_study_sets");
    } else {
      alert("Login is require for this feature.");
    }
  },

  toMyKlasses(){
    if (this.loggedIn()){
      hashHistory.push("?option=my_classes");
    } else {
      alert("Login is require for this feature.");
    }
  },

  toMyTestScores(){
    if (this.loggedIn()){
      hashHistory.push("my_test_scores");
    } else {
      alert("Login is require for this feature.");
    }
  },

  toCreateStudySet(){
    if (this.loggedIn()){
      hashHistory.push("study_set_form");
    } else {
      alert("Login is require for this feature.");
    }
  },

  toCreateClass(){
    if (this.loggedIn()){
      hashHistory.push("class_form");
    } else {
      alert("Login is require for this feature.");
    }
  },

  toIndex(){
    hashHistory.push("/");
  },

  render(){
    return (
      <aside className="side-navbar">
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
