const React = require('react');
const IndexStore = require('../stores/index_store');
const IndexActions = require('../actions/index_actions');
const KlassIndexItem = require('./klass_index_item');
const Button = require('react-bootstrap').Button;
const hashHistory = require('react-router').hashHistory;
const ListGroup = require('react-bootstrap').ListGroup;

const KlassIndex = React.createClass({

  getInitialState(){
    return ({klasses: IndexStore.getKlasses()});
  },

  fetchBasedOnProps(newProps){
    const option = newProps ? newProps.option : this.props.option;
    if (option === "myKlassesCreated") {
      IndexActions.getMyKlassCreatedIndex();
    } else if (option === "myKlasses") {
      IndexActions.getMyKlassIndex();
    } else {
      IndexActions.getKlassIndex();
    }
  },

  componentDidMount(){
    this.fetchBasedOnProps();
    this.indexListener = IndexStore.addListener(this.updateState);
  },

  updateState(){
    this.setState({klasses: IndexStore.getKlasses()});
  },

  componentWillUnmount(){
    this.indexListener.remove();
  },

  componentWillReceiveProps(newProps){
    this.fetchBasedOnProps(newProps);
  },

  createKlass(event){
    event.preventDefault();
    hashHistory.push("/class_form");
  },

  render(){
    return(
      <div className="klass_index">
        <h1 className="title">{this.props.title}</h1>
        <ListGroup>
        {
          this.state.klasses.map( klass => {
            return <KlassIndexItem klass={klass} key={klass.id}/>;
          })
        }
        </ListGroup>
        <Button onClick={this.createKlass}>+ Create New Class(dev.)</Button>
      </div>
    );
  }



});

module.exports = KlassIndex;
