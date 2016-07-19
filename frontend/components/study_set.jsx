const React = require('react');
const StudySetActions = require('../actions/study_set_actions');
const StudySetStore = require('../stores/study_set_store');
const CurrentUserStore = require('../stores/current_user_store');
const hashHistory = require('react-router').hashHistory;
const ButtonGroup = require('react-bootstrap').ButtonGroup;
const Button = require('react-bootstrap').Button;
const StudySetList = require('./study_set_list');
const Tabs = require('react-bootstrap').Tabs;
const Tab = require('react-bootstrap').Tab;
const Test = require('./test');
const Flashcards = require('./flashcards');

const StudySet = React.createClass({
  getInitialState(){
    return ({studySet: StudySetStore.getStudySet(), joyrideAdded: false});
  },

  joyrideSteps: [
    {
      title: "Flashcards",
      text: "Virtual flashcards are the great way to memorize.",
      selector: '#study-set-options-tab-2',
      position: 'top',
      type: 'hover'
    },
    {
      title: "Test",
      text: "Do you know all the words? Take a Test!",
      selector: '#study-set-options-tab-3',
      position: 'top',
      type: 'hover'
    },
    {
      title: "Edit Study Set",
      text: "The creator of the Study Set can add and remove words.",
      selector: '#edit-button',
      position: 'top',
      type: 'hover'
    },

  ],

  componentDidUpdate(){
    if (document.getElementById('study-set-options-tab-3') && this.state.joyrideAdded === false){
      this.props.resetTour();
      this.props.addSteps(this.joyrideSteps);
      this.setState({joyrideAdded: true});
    }
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
          <Button bsSize='small' onClick={this.editStudySet} id="edit-button">Edit</Button>
        </ButtonGroup>
      );
    }
  },



  render(){
    // let children = "";
    // children = React.cloneElement(this.props.children, {
    //   words: this.state.studySet.words,
    //   language_name: this.state.studySet.language.name
    // });
    return (
      <div className="study_set">
        <header className="study_set_header">
          <h4 className="title">Study Set</h4>
          <h1 className="title">{this.state.studySet.name}</h1>
          {this.showDetails()}
        </header>

        <Tabs defaultActiveKey={1} id="study-set-options">
          <Tab eventKey={1} title="List">
            <StudySetList words={this.state.studySet.words}
              language_name={this.state.studySet.language.name}/>
          </Tab>
          <Tab eventKey={2} title="Flashcards" >
            <Flashcards words={this.state.studySet.words}
              language_name={this.state.studySet.language.name}/>
          </Tab>
          <Tab eventKey={3} title="Test">
            <Test words={this.state.studySet.words}
            language_name={this.state.studySet.language.name}/>
          </Tab>
        </Tabs>
      </div>
    );
  }
});

module.exports = StudySet;
