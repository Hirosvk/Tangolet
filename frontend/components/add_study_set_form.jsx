const React = require('react');
const StudySetPoolStore = require('../stores/study_set_pool_store');
const IndexActions = require('../actions/index_actions');
const KlassStore = require('../stores/klass_store');
const KlassActions = require('../actions/klass_actions');
const hashHistory = require('react-router').hashHistory;
const ListGroup = require('react-bootstrap').ListGroup;
const ListGroupItem = require('react-bootstrap').ListGroupItem;
const Button = require('react-bootstrap').Button;

const AddStudySetForm = React.createClass({
  getInitialState(){
    const klass = KlassStore.getKlass();
    return ({
      klassName: klass.name,
      klassId: klass.id,
      studySetIds: klass.study_set_ids,
      showOtherUsersSets: false,
      studySets: StudySetPoolStore.getStudySets()
    });
  },

  componentDidMount(){
    IndexActions.fillStudySetPool();
    this.poolListener = StudySetPoolStore.addListener(this.updateStudySets);
    this.klassListener = KlassStore.addListener(this.updateKlass);
    //  by the time AddStudySetForm mounts, the new Klass info has not reached
    //  KlassStore. So, AddStudySetForm initializes with the old klass info.
    //  that's why it needs to add listener to Klass Store to update the
    //  state with the new klass info.
  },

  componentWillUnmount(){
    this.poolListener.remove();
    this.klassListener.remove();
  },

  updateKlass(){
    const klass = KlassStore.getKlass();
    this.setState({
      klassName: klass.name,
      klassId: klass.id,
      studySetIds: klass.study_set_ids
    });
  },

  updateStudySets(){
    this.setState({studySets: StudySetPoolStore.getStudySets()});
  },

  redirect(){
    this.props.backToStudySets();
  },



  checked(id){
    if (this.state.studySetIds.indexOf(id) >= 0){
      return true;
    } else {
      return false;
    }
  },


  checkboxes(){
    return this.state.studySets.map( studySet => {
      return (
        <ListGroupItem
          key={studySet.id}
          id={studySet.id}
          onClick={this.updateStudySetIds}
          active={this.checked(studySet.id)}
          header={studySet.name}>
          created by {studySet.creator.username}
        </ListGroupItem>
      );
    });
  },

  updateStudySetIds(event){
    let id = parseInt(event.currentTarget.id);
    let idx = this.state.studySetIds.indexOf(id);
    let newIds = this.state.studySetIds;
    if (idx < 0){
      newIds.push(id);
    } else {
      newIds.splice(idx, 1);
    }
    this.setState({studySetIds: newIds});
  },


  loadMoreStudySets(){
    this.setState({showOtherUsersSets: true},
      IndexActions.fillStudySetPool.bind(IndexActions, "all"));
  },

  loadLessStudySets(){
    this.setState({showOtherUsersSets: false},
      IndexActions.fillStudySetPool.bind(IndexActions));
  },

  toggleSelections(){
    if (this.state.showOtherUsersSets){
      return (
        <Button onClick={this.loadLessStudySets}>
          Select only from your Study Sets
        </Button>
      );
    } else {
      return (
        <Button onClick={this.loadMoreStudySets}>
          Select Study Sets created by other users
        </Button>
      );
    }
  },

  render(){
    return(
      <div className="add_study_set_form">
        <h2>Select or unselect study sets for this class.</h2>
        <ListGroup>
          {this.checkboxes()}
          {this.toggleSelections()}
          <Button onClick={this.sendNewIds}>Update</Button>
        </ListGroup>
      </div>
    );
  },

  sendNewIds(event){
    event.preventDefault();
    let data = {};
    data.id = this.state.klassId;
    if (this.state.studySetIds.length === 0){
      data.studySetIds = ["dummy"];
      // ajax (or javascript) would not send object that contains
      // empty array, so we are passing ["dummy"] only if the array is empty.
    } else {
      data.studySetIds = this.state.studySetIds;
    }
    this.klassListener.remove();
    this.klassListener = KlassStore.addListener(this.redirect);
    KlassActions.updateStudySets(data);
  }


});

module.exports = AddStudySetForm;
