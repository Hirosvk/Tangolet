const React = require('react');
const IndexStore = require('../stores/index_store');
const IndexActions = require('../actions/index_actions');
const StudySetIndexItem = require('./study_set_index_item');
const Button = require('react-bootstrap').Button;
const hashHistory = require('react-router').hashHistory;
const ListGroup = require('react-bootstrap').ListGroup;
const KlassStore = require('../stores/klass_store');

const StudySetIndex = React.createClass({

  debugger(){
    console.log("setState");
  },

  getInitialState(){
    return ({studySets: []});
  },

  componentDidMount(){
    this.fetchBasedOnProps();
  },

  componentWillReceiveProps(newProps){
    this.fetchBasedOnProps(newProps);
  },

  fetchBasedOnProps(newProps){
    const props = newProps || this.props;
    if (props.klassId){
      this.setState({studySets: KlassStore.getStudySets()}, this.debugger);
    } else {
      if (props.option === "myStudySets") {
        IndexActions.getMyStudySetIndex();
      } else if (props.option === "search") {
        // do not fetch
      } else {
        IndexActions.getStudySetIndex();
      }
      this.indexListener = IndexStore.addListener(this.updateState);
    }
  },

  componentWillUnmount(){
    if (this.indexListener.subscriber !== undefined) {
      console.log(this.indexListener);
      this.indexListener.remove();
      console.log(this.indexListener);
    }
  },

  updateState(){
    if (this.indexListener.subscriber !== undefined) {
      this.setState({studySets: IndexStore.getStudySets()}, this.debugger);
    }
  },

  createStudySet(event){
    event.preventDefault();
    hashHistory.push("/study_set_form");
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
        {
          this.state.studySets.map( studySet => {
            return <StudySetIndexItem studySet={studySet} key={studySet.id}/>;
          })
        }
        </ListGroup>
        <Button onClick={this.createStudySet}>+ Create New Study Set(dev.)</Button>
      </div>
    );
  }



});

module.exports = StudySetIndex;
