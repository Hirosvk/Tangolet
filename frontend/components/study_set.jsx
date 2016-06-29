const React = require('react');
const StudySetActions = require('../actions/study_set_actions');
const StudySetStore = require('../stores/study_set_store');
const CurrentUserStore = require('../stores/current_user_store');
const hashHistory = require('react-router').hashHistory;

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
    if (studySet){
      return (
        <ul>
          <li>Created by {studySet.creator.username}</li>
          <li>Created at {new Date(studySet.created_at).toLocaleString()}</li>
        </ul>
      );
    }
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
    if (this.state.studySet){
      if (CurrentUserStore.getCurrentUser().id === this.state.studySet.creator.id ){
        return (
          <div>
            <button onClick={this.deleteStudySet}>Delete</button>
            <button onClick={this.editStudySet}>Edit</button>
          </div>
        );
      }
    }
  },

  render(){
    let children = "";
    let studySet = {};
    if (this.state.studySet){
      children = React.cloneElement(this.props.children, {
        words: this.state.studySet.words
      });
      studySet = this.state.studySet;
    }
    return (
      <div className="study_set">
        <header className="study_set_header">
          <h1>{studySet.name}</h1>
          {this.showDetails()}
          {this.buttons()}
        </header>
        {children}
      </div>
    );
  }
});

module.exports = StudySet;
