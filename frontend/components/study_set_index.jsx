const React = require('react');
const StudySetIndexItem = require('./study_set_index_item');
const Button = require('react-bootstrap').Button;
const hashHistory = require('react-router').hashHistory;
const ListGroup = require('react-bootstrap').ListGroup;
const StudySetIndexStore = require('../stores/study_set_index_store');
const Session = require('./session_mixin');

const StudySetIndex = React.createClass({
  mixins: [Session],

  getInitialState(){
    return ({studySets: StudySetIndexStore.getStudySets()});
  },

  componentDidMount(){
    this.storeListener = StudySetIndexStore.addListener(this.updateState);
    if (this.props.option === "myStudySets") {
      this.currentUserListenerSetup();
    }
  },

  componentWillReceiveProps(newProps){
    this.currentUserListenerRemove();
    if (newProps.option === "myStudySets") {
      this.currentUserListenerSetup();
    }
  },

  componentWillUnmount(){
    this.storeListener.remove();
    this.storeListener = undefined;
    this.currentUserListenerRemove();
  },

  updateState(){
    this.setState({studySets: StudySetIndexStore.getStudySets()});
  },

  createStudySet(event){
    event.preventDefault();
    hashHistory.push("/study_set_form");
  },

  items(){
    if (this.state.studySets.length > 0){
      return this.state.studySets.map( studySet => {
        return <StudySetIndexItem studySet={studySet} key={studySet.id}/>;
      });
    } else {
      return <h2>No Study Sets</h2>;
    }
  },

  render(){
    let title;
    if (this.props.title) {
      title = <h1 className="title">{this.props.title}</h1>;
    }
    return(
      <div className="study_set_index">
        {title}
        <ListGroup>
        { this.items() }
        </ListGroup>
        <Button onClick={this.createStudySet}>+ Create New Study Set</Button>
      </div>
    );
  }



});

module.exports = StudySetIndex;
