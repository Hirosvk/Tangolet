const React = require('react');
const KlassIndexStore = require('../stores/klass_index_store');
const IndexActions = require('../actions/index_actions');
const KlassIndexItem = require('./klass_index_item');
const Button = require('react-bootstrap').Button;
const hashHistory = require('react-router').hashHistory;
const ListGroup = require('react-bootstrap').ListGroup;

const KlassIndex = React.createClass({

  getInitialState(){
    return ({klasses: KlassIndexStore.getKlasses(this.props.option)});
  },

  // fetchBasedOnProps(newProps){
  //   const option = newProps ? newProps.option : this.props.option;
  //   if (option === "createdKlasses") {
  //     IndexActions.getMyKlassCreatedIndex();
  //   } else if (option === "enrolledKlasses") {
  //     IndexActions.getMyKlassIndex();
  //   } else if (option === "search") {
  //     // does not fetch
  //   } else {
  //     IndexActions.getKlassIndex();
  //   }
  // },

  componentDidMount(){
    // this.fetchBasedOnProps();
    this.indexListener = KlassIndexStore.addListener(this.updateState);
  },

  updateState(){
    this.setState({klasses: KlassIndexStore.getKlasses(this.props.option)});
  },

  componentWillUnmount(){
    this.indexListener.remove();
  },

  // componentWillReceiveProps(newProps){
  //   this.fetchBasedOnProps(newProps);
  // },

  createKlass(event){
    event.preventDefault();
    hashHistory.push("/class_form");
  },

  items(){
    if (this.state.klasses.length > 0){
      return this.state.klasses.map( klass => {
        return <KlassIndexItem klass={klass} key={klass.id}/>;
      });
    } else {
      return <h2>No Classes</h2>;
    }
  },



  render(){
    return(
      <div className="klass_index">
        <h1 className="title">{this.props.title}</h1>
        <ListGroup>
        { this.items() }
        </ListGroup>
        <Button onClick={this.createKlass}>+ Create New Class(dev.)</Button>
      </div>
    );
  }



});

module.exports = KlassIndex;
