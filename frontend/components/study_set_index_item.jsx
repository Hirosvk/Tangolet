const React = require('react');
const hashHistory = require('react-router').hashHistory;

const StudySetIndexItem = React.createClass({

  goToStudySet(){
    hashHistory.push(`/study_set/${this.props.studySet.id}`);
  },

  render(){
    return(
      <div className="study_set_index_item">
        <a onClick={this.goToStudySet}>
          <p>name: {this.props.studySet.name}</p>
          <p>creator: {this.props.studySet.creator.username}</p>
        </a>
      </div>
    );
  }

});

module.exports = StudySetIndexItem;
