const React = require('react');
const hashHistory = require('react-router').hashHistory;
const ListGroupItem = require('react-bootstrap').ListGroupItem;

const StudySetIndexItem = React.createClass({

  goToStudySet(){
    hashHistory.push(`/study_set/${this.props.studySet.id}`);
  },

  render(){
    return(
      <ListGroupItem
        onClick={this.goToStudySet}
        header={this.props.studySet.name}>
        language: {this.props.studySet.language.name} | created by {this.props.studySet.creator.username}
      </ListGroupItem>
    );
    // I have spent hours trying to get rid of "Unknown prop 'header'"" on Chrome console.
    // The website renders fine with all functioinalities.
    // Since the link provided by the Chrome console suggested that it might be because
    // I'm passing its own props as props. I tried giving constant strings to the 'header' props,
    // but it still doesnt work. so the warning is not from the passing of the props.
    // One online discussion suggested that nothing breaks, and that it's just a noise.
  }

});

module.exports = StudySetIndexItem;
