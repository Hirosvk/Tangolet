const React = require('react');
const IndexActions = require('../actions/index_actions');
const StudySetIndexItem = require('./study_set_index_item');
const Button = require('react-bootstrap').Button;
const hashHistory = require('react-router').hashHistory;
const ListGroup = require('react-bootstrap').ListGroup;
const StudySetIndexStore = require('../stores/study_set_index_store');

const StudySetIndex = React.createClass({

  getInitialState(){
    return ({studySets: StudySetIndexStore.getStudySets()});
  },

  componentDidMount(){
    this.storeListener = StudySetIndexStore.addListener(this.updateState);
  },

  // componentWillReceiveProps(newProps){
  //   this.fetchBasedOnProps(newProps);
  // },

  // fetchBasedOnProps(newProps){
  //   const props = newProps || this.props;
  //   if (props.klassId){
  //     this.setState({studySets: KlassStore.getStudySets()});
  //   } else {
  //     if (props.option === "myStudySets") {
  //       IndexActions.getMyStudySetIndex();
  //     } else if (props.option === "search") {
  //       // do not fetch
  //     } else {
  //       IndexActions.getStudySetIndex();
  //     }
  //     this.indexListener = IndexStore.addListener(this.updateState);
  //   }
  // },

  componentWillUnmount(){
    this.storeListener.remove();
    this.storeListener = undefined;
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
      return <h2>No Study Sets</h2>
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
        <Button onClick={this.createStudySet}>+ Create New Study Set(dev.)</Button>
      </div>
    );
  }



});

module.exports = StudySetIndex;
