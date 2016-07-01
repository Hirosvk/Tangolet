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
  }

});

module.exports = StudySetIndexItem;
