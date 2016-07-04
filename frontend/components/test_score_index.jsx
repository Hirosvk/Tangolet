const React = require('react');
const TestStore = require('../stores/test_store');
const TestActions = require('../actions/test_actions');
const Button = require('react-bootstrap').Button;
const hashHistory = require('react-router').hashHistory;
const ListGroup = require('react-bootstrap').ListGroup;
const CurrentUserStore = require('../stores/current_user_store');
const TestScoreIndexItem = require('./test_score_index_item');

const TestScoreIndex = React.createClass({

  getInitialState(){
    return ({testScores: []});
  },

  componentDidMount(){
    this.testListener = TestStore.addListener(this.updateState);

    if (this.props.klassId){
      let data = {klassId: this.props.klassId};

      if (this.props.studentId) {
        console.log("bystudentId");
        data.studentId = this.props.studentId;
        TestActions.fetchScoresByStudents(data);

      } else if (this.props.studySetId){
        console.log("by studysets");
        data.studySetId = this.props.studySetId;
        TestActions.fetchScoresByStudySets(data);
      }

    } else if (CurrentUserStore.getCurrentUser().id){
      console.log("current_user");
      TestActions.fetchScoresCurrentUser();
    }

  },

  componentWillUnmount(){
    this.testListener.remove();
  },

  updateState(){
    this.setState({testScores: TestStore.getTestScores()});
  },

  render(){
    let title;
    if (this.props.title) {
      title = this.props.title;
    } else {
      title = `${CurrentUserStore.getCurrentUser().username}'s Test Score`;
    }

    return(
      <div className="study_set_index">
        <h1 className="title">{title}</h1>
        <ListGroup>
        {
          this.state.testScores.map( testScore => {
            return <TestScoreIndexItem testScore={testScore} link="true" key={testScore.id} />;
          })
        }
      </ListGroup>
      </div>
    );
  }



});

module.exports = TestScoreIndex;
