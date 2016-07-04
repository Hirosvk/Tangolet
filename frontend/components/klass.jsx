const React = require('react');
const KlassActions = require('../actions/klass_actions');
const KlassStore = require('../stores/klass_store');
const CurrentUserStore = require('../stores/current_user_store');
const hashHistory = require('react-router').hashHistory;
const StudySetIndex = require('./study_set_index');
const AddStudySetForm = require('./add_study_set_form');
const ButtonGroup = require('react-bootstrap').ButtonGroup;
const Button = require('react-bootstrap').Button;
const Tabs = require('react-bootstrap').Tabs;
const Tab = require('react-bootstrap').Tab;
const TestCollection = require('./test_collection');

const Klass = React.createClass({
  getInitialState(){
    return ({
      klass: KlassStore.getKlass(),
      enrollmentStatus: this.enrollmentStatus(),
      activeKey: 1
    });
  },

  componentWillMount(){
    const id = this.props.params.klassId;
    KlassActions.fetchKlass(id);
    this.listener = KlassStore.addListener(this.updateState);
    this.userListener = CurrentUserStore.addListener(this.updateEnrollment);
  },

  componentWillUnmount(){
    this.listener.remove();
    this.userListener.remove();
  },

  enrollmentStatus(){
    const id = parseInt(this.props.params.klassId);
    return (CurrentUserStore.klassIds().indexOf(id) >= 0);
  },


// store listeners

  updateState(){
    this.setState({klass: KlassStore.getKlass()});
  },

  updateEnrollment(){
    this.setState({enrollmentStatus: this.enrollmentStatus()});
  },

  redirectToIndex(resp){
    hashHistory.push("/");
  },

// -------------
// actions and redirections

  deleteKlass(){
    KlassActions.deleteKlass(this.props.params.klassId, this.redirectToIndex);
  },

  editKlass(){
    hashHistory.push("/class_form/edit");
  },

  addStudySets(){
    hashHistory.push(`/class/${this.props.params.klassId}/add_study_sets`);
  },

  toggleEnrollment(){
    KlassActions.toggleEnrollment(this.props.params.klassId);
  },



// -----------
// render helpers

  showDetails(){
    const klass = this.state.klass;
    const d = new Date(klass.created_at);
    const date = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
    return (
      <div className="details">
        <h3>Language: {this.state.klass.language.name} | Teacher: {this.state.klass.teacher.username} | created at {date}{this.buttons()}</h3>
      </div>
    );
  },


  buttons(){
    const currentUser = CurrentUserStore.getCurrentUser();
    if (currentUser.id === this.state.klass.teacher.id ){
      return (
        <ButtonGroup>
          <Button onClick={this.deleteKlass}>Delete</Button>
          <Button onClick={this.editKlass}>Edit</Button>
        </ButtonGroup>
      );
    } else if (currentUser.id) {
      if (this.state.enrollmentStatus){
        return (
          <ButtonGroup>
            <Button onClick={this.toggleEnrollment}>Unenroll</Button>
          </ButtonGroup>
        );
      } else {
        return (
          <ButtonGroup>
            <Button onClick={this.toggleEnrollment}>Enroll</Button>
          </ButtonGroup>
        );
      }
    }
  },

  isTeacher(){
    return (CurrentUserStore.getCurrentUser().id === this.state.klass.teacher.id)
  },

  changeActiveKey(eventKey){
    this.setState({activeKey: parseInt(eventKey)});
  },

  backToStudySets(){
    this.setState({activeKey: 1});
  },

  testScoreOption(){
    if (this.state.activeKey === 4){
      return "by_study_sets";
    } else if (this.state.activeKey === 5){
      return "by_students";
    }
  },

  tabs(){
    let thirdTab;
    if (this.isTeacher()){
      thirdTab = (
        <Tab eventKey={3} title="Add Study Sets">
          <AddStudySetForm backToStudySets={this.backToStudySets}/>
        </Tab>);
    }

    let forthTab;
    if (this.isTeacher()){
      forthTab = (
        <Tab eventKey={4} title="Test Scores by Study Sets">
          <TestCollection option={this.testScoreOption()}/>
        </Tab>);
    }

    let fifthTab;
    if (this.isTeacher()){
      fifthTab = (
        <Tab eventKey={5} title="Test Scores by Students">
          <TestCollection option={this.testScoreOption()}/>
        </Tab>);
    }

    return (
      <Tabs activeKey={this.state.activeKey} onSelect={this.changeActiveKey} id="klass-options">
        <Tab eventKey={1} title="Study Sets">
          <StudySetIndex klassId={this.props.params.klassId} />
        </Tab>
        <Tab eventKey={2} title="Students" disabled />
        {thirdTab}
        {forthTab}
        {fifthTab}
      </Tabs>
    );
  },

  render(){
    // this code is no longer necessary b/c I'm using bootstrap.
    // Without it I would have had to pass props like below.

    // let children = React.cloneElement(this.props.children, {
    //   klassId: this.props.params.klassId
    // });
    return (
      <div className="klass">
        <header className="klass_header">
          <h4 className="title">Class</h4>
          <h1 className="title">{this.state.klass.name}</h1>
          <h3 className="description">Class description: {this.state.klass.description}</h3>
          {this.showDetails()}
        </header>
        {this.tabs()}
      </div>
    );
  }
});

module.exports = Klass;
