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

const AddStudySetForm = React.createClass({
  getInitialState(){
    const klass = KlassStore.getKlass();
    return ({
      klassName: klass.name,
      klassId: klass.id,
      studySetIds: KlassStore.getKlass().study_set_ids,
      studySets: IndexStore.getStudySets()
    });
  },


  componentDidMount(){
    IndexActions.getStudySetIndex();
    this.indexListener = IndexStore.addListener(this.updateStudySets);
    this.klassListener = KlassStore.addListener(this.redirectToKlass);
  },


  componentWillUnmount(){
    this.indexListener.remove();
    this.klassListener.remove();
  },

  redirectToKlass(){
    hashHistory.push(`class/${this.state.klassId}`);
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
    KlassActions.updateStudySets(data);
  },

  render(){
    console.log(this.state.studySetIds);
    return(
      <ListGroup>
        {this.checkboxes()}
        <button onClick={this.sendNewIds}>Update</button>
      </ListGroup>
    );
  }


});

module.exports = AddStudySetForm;
