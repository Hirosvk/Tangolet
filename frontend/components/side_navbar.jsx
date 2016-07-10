const React = require('react');
const Modal = require('react-bootstrap').Modal;
const Navigation = require('./navigation_mixin');

const SideNavbar = React.createClass({
  mixins: [Navigation],

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
