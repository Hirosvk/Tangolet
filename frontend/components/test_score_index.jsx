const React = require('react');
const TestStore = require('../stores/test_store');
const TestActions = require('../actions/test_actions');
const Button = require('react-bootstrap').Button;
const hashHistory = require('react-router').hashHistory;
const ListGroup = require('react-bootstrap').ListGroup;
const CurrentUserStore = require('../stores/current_user_store');
const TestScoreIndexItem = require('./test_score_index_item');
const Session = require('./session_mixin');

const TestScoreIndex = React.createClass({
  mixins: [Session],

  getInitialState(){
    return ({testScores: []});
  },

  componentDidMount(){
    this.testListener = TestStore.addListener(this.updateState);
    this.currentUserListenerSetup();
    if (this.props.klassId){
      let data = {klassId: this.props.klassId};

      if (this.props.studentId) {
        data.studentId = this.props.studentId;
        TestActions.fetchScoresByStudents(data);

      } else if (this.props.studySetId){
        data.studySetId = this.props.studySetId;
        TestActions.fetchScoresByStudySets(data);
      }

    } else if (CurrentUserStore.getCurrentUser().id){
      TestActions.fetchScoresCurrentUser();
    }

  },

  componentWillUnmount(){
    this.testListener.remove();
    this.currentUserListenerRemove();
  },

  updateState(){
    this.setState({testScores: TestStore.getTestScores()});
  },

  items(){
    if (this.state.testScores.length > 0) {
      return this.state.testScores.map( testScore => {
        return <TestScoreIndexItem testScore={testScore} link="true" key={testScore.id} />;
      });
    } else {
      return <h2>No Test Scores</h2>;
    }
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
        { this.items() }
      </ListGroup>
      </div>
    );
  }



});

module.exports = TestScoreIndex;
