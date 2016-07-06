const React = require('react');
const IndexStore = require('../stores/index_store');
const IndexActions = require('../actions/index_actions');
const KlassStore = require('../stores/klass_store');
const KlassActions = require('../actions/klass_actions');
const hashHistory = require('react-router').hashHistory;
// users are redirected here from the class,
// hence have access to KlassStore
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
      studySets: IndexStore.getStudySets()
    });
  },

  componentDidMount(){
    IndexActions.getStudySetIndex();
    this.indexListener = IndexStore.addListener(this.updateStudySets);
    this.klassListener = KlassStore.addListener(this.updateKlass);
    //  by the time AddStudySetForm mounts, the new Klass info has not reached
    //  KlassStore. So, AddStudySetForm initializes with the old klass info.
    //  that's why it needs to add listener to Klass Store to update the
    //  state with the new klass info.
  },

  componentWillUnmount(){
    this.indexListener.remove();
    this.klassListener.remove();
    // this.studySetIdListener.remove();
  },

  updateKlass(){
    const klass = KlassStore.getKlass();
    this.setState({
      klassName: klass.name,
      klassId: klass.id,
      studySetIds: klass.study_set_ids,
      studySets: IndexStore.getStudySets()
    });
  },

  redirect(){
    this.props.backToStudySets();
    // alert("successfully updated");
  },

  updateStudySets(){
    this.setState({studySets: IndexStore.getStudySets()});
  },


  checked(id){
    if (this.state.studySetIds.indexOf(id) >= 0){
      return true;
    } else {
      return false;
    }
  },

// controlled: value = state, change is reflect on the value,
// uncontrolled: input tag doesn't have a value

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

  // <label key={`label${studySet.id}`}>
  // <input type="checkbox"
  //       id={studySet.id}
  //       defaultChecked={this.checked(studySet.id)}
  //       key={studySet.id}
  //       onClick={this.updateStudySetIds}/>
  //     <ul>
  //     <li>{studySet.name}</li>
  //     <li>created by {studySet.creator.username}</li>
  //     <li>language: {studySet.language.name}</li>
  //     </ul>
  // </label>

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
  },

  render(){
    return(
      <div className="add_study_set_form">
        <h2>Select or unselect study sets for this class.</h2>
        <ListGroup>
          {this.checkboxes()}
          <Button onClick={this.sendNewIds}>Update</Button>
        </ListGroup>
      </div>
    );
  }


});

module.exports = AddStudySetForm;
