const React = require('react');
const IndexStore = require('../stores/index_store');
const IndexActions = require('../actions/index_actions');
const StudySetIndexItem = require('./study_set_index_item');
const Button = require('react-bootstrap').Button;
const hashHistory = require('react-router').hashHistory;
const ListGroup = require('react-bootstrap').ListGroup;

const StudySetIndex = React.createClass({

  getInitialState(){
    return ({studySets: IndexStore.getStudySets()});
  },

  componentDidMount(){
    if (this.props.klassId){
      IndexActions.getStudySetIndexforKlass(this.props.klassId);
    } else {
      IndexActions.getStudySetIndex();
    }
    this.indexListener = IndexStore.addListener(this.updateState);
  },

  componentWillUnmount(){
    this.indexListener.remove();
  },

  updateState(){
    this.setState({studySets: IndexStore.getStudySets()});
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
