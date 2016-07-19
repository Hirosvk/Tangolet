const React = require('react');
const Modal = require('react-bootstrap').Modal;
const Navigation = require('./navigation_mixin');

const SideNavbar = React.createClass({
  mixins: [Navigation],

  joyrideSteps: [
    {
      index: 1,
      title: "My Classes",
      text: "View the Classes you teach, and the Classes you are enrolled in.",
      selector: '#my-classes',
      position: 'top',
      type: 'hover'
    },
    {
      index: 2,
      title: "My StudySets",
      text: "View Study Sets you created.",
      selector: '#my-study-sets',
      position: 'bottom',
      type: 'hover'
    }
  ],

  componentDidMount(){
    this.props.addSteps(this.joyrideSteps);
  },

  render: function(){
    return (
      <aside className="side-navbar">

        {this.modals()}

        <button className="btn blue-btn" onClick={this.toIndex}>Home</button>
        <button className="btn blue-btn" onClick={this.toLanguages}>Languages</button>
        <button id='my-classes' className="btn green-btn" onClick={this.toMyKlasses}>My Classes</button>
        <button id='my-study-sets' className="btn green-btn" onClick={this.toMyStudySets}>My Study Sets </button>
        <button className="btn yellow-btn" onClick={this.toMyTestScores}>My Test Scores</button>
        <button className="btn orange-btn" onClick={this.toCreateClass}>Create Class</button>
        <button className="btn orange-btn" onClick={this.toCreateStudySet}>Create Study Set</button>
        <button className="btn pink-btn" onClick={this.toAbout}>About</button>
      </aside>
    );
  }
});

module.exports = SideNavbar;
