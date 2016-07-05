const React = require('react');
const StudySetIndex = require('./study_set_index');
const KlassIndex = require('./klass_index');
const IndexActions = require('../actions/index_actions');
const CurrentUserStore = require('../stores/current_user_store');
const hashHistory = require('react-router').hashHistory;

const SideNavbar = React.createClass({

  toMyStudySets(){
    hashHistory.push("?option=my_study_sets");
  },

  toMyKlasses(){
    hashHistory.push("?option=my_classes");
  },

  toMyTestScores(){
    hashHistory.push("my_test_scores");
  },

  toCreateStudySet(){
    hashHistory.push("study_set_form");
  },

  toCreateClass(){
    hashHistory.push("class_form");
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
