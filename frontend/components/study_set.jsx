const React = require('react');
const StudySetActions = require('../actions/study_set_actions');
const StudySetStore = require('../stores/study_set_store');
const CurrentUserStore = require('../stores/current_user_store');
const hashHistory = require('react-router').hashHistory;
const ButtonGroup = require('react-bootstrap').ButtonGroup;
const Button = require('react-bootstrap').Button;

const StudySet = React.createClass({
  getInitialState(){
    return ({studySet: StudySetStore.getStudySet()});
  },

  componentDidMount(){
    const id = this.props.params.id;
    StudySetActions.fetchStudySet(id);
    this.listener = StudySetStore.addListener(this.updateState);
  },

  componentWillUnmount(){
    this.listener.remove();
  },

  updateState(){
    this.setState({studySet: StudySetStore.getStudySet()});
  },

  showDetails(){
    const studySet = this.state.studySet;
    const d = new Date(studySet.created_at);
    const date = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
    // getMonth gives value 0 - 11
    return (
      <div className="details">
        <h3>created by {studySet.creator.username} | created at {date}{this.buttons()}</h3>
      </div>
    );
  },

  redirectToIndex(resp){
    hashHistory.push("/");
  },

  deleteStudySet(){
    StudySetActions.deleteStudySet(this.props.params.id, this.redirectToIndex);
  },

  editStudySet(){
    hashHistory.push("/study_set_form/edit");
  },

  buttons(){
    if (CurrentUserStore.getCurrentUser().id === this.state.studySet.creator.id ){
      return (
        <ButtonGroup>
          <Button bsSize='small' onClick={this.deleteStudySet}>Delete</Button>
          <Button bsSize='small' onClick={this.editStudySet}>Edit</Button>
        </ButtonGroup>
      );
    }
  },

  render(){
    let children = "";
    children = React.cloneElement(this.props.children, {
      words: this.state.studySet.words,
      language_name: this.state.studySet.language.name
    });
    return (
      <div className="study_set">
        <header className="study_set_header">
          <h4 className="title">Study Set</h4>
          <h1 className="title">{this.state.studySet.name}</h1>
          {this.showDetails()}
        </header>
        {children}
      </div>
    );
  }
});

module.exports = StudySet;
