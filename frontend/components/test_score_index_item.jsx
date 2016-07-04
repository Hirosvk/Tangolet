const React = require('react');
const ListGroupItem = require('react-bootstrap').ListGroupItem;
const hashHistory = require('react-router').hashHistory;
const Button = require('react-bootstrap').Button;
const TestScoreIndexItem = React.createClass({

  componentWillReceiveProps(newProps){
    this.testScore = newProps.testScore;
  },

  goToStudySet(){
    hashHistory.push(`/study_set/${this.props.testScore.id}`);
  },

  render(){
    let titleAndScore;
    let details;
    let link;
    if (this.testScore || this.props.testScore) {
      const testScore = this.testScore || this.props.testScore;
      titleAndScore = `Score: ${testScore.score} | ${testScore.study_set_name}`;
      const date = new Date(testScore.created_at);
      const dateString = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      details = `taken on: ${dateString} | taken by: ${testScore.student_username}`;

      if (this.props.link){
        link = <Button bsStyle="link" onClick={this.goToStudySet}>go to Study Set</Button>;
      }
    }
    return(
      <ListGroupItem
        header={titleAndScore}>
        {details}{link}
      </ ListGroupItem>
    );
  }
});

module.exports = TestScoreIndexItem;
