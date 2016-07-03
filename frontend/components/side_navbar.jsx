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
    hashHistory.push("?option=my_classes_enrolled");
  },

  toMyKlassesCreated(){
    hashHistory.push("?option=my_classes_created");
  },

  toIndex(){
    hashHistory.push("/");
  },

  render(){
    return (
      <div className="side-navbar">
        <button className="btn" >Welcome</button>
        <button className="btn" onClick={this.toIndex}>Browse</button>
        <button className="btn" onClick={this.toMyKlassesCreated}>Classes I Teach</button>
        <button className="btn" onClick={this.toMyKlasses}>Classes I Take</button>
        <button className="btn" onClick={this.toMyStudySets}>Study Sets I Created</button>
        <button className="btn" >My Test Scores</button>
        <button className="btn" >About</button>
      </div>
    )
  }
});

module.exports = SideNavbar;
