const React = require('react');
const KlassIndexStore = require('../stores/klass_index_store');
const KlassIndexItem = require('./klass_index_item');
const Button = require('react-bootstrap').Button;
const hashHistory = require('react-router').hashHistory;
const ListGroup = require('react-bootstrap').ListGroup;
const Session = require('./session_mixin');

const KlassIndex = React.createClass({
  mixins: [Session],

  getInitialState(){
    return ({klasses: KlassIndexStore.getKlasses(this.props.option)});
  },

  componentDidMount(){
    this.indexListener = KlassIndexStore.addListener(this.updateState);
    if (this.props.option === "createdKlasses" || this.props.option === "enrolledKlasses") {
      this.currentUserListenerSetup();
      // so that when user logs out while viewing "My Classes", and she no
      // longer has an access to the page and gets directed to Index
    }
  },

  componentWillReceiveProps(newProps){
    this.currentUserListenerRemove();
    if (newProps.option === "createdKlasses" || newProps.option === "enrolledKlasses"){
      this.currentUserListenerRemove();
    }
  },

  updateState(){
    this.setState({klasses: KlassIndexStore.getKlasses(this.props.option)});
  },

  componentWillUnmount(){
    this.indexListener.remove();
    this.currentUserListenerRemove();
  },

  createKlass(event){
    event.preventDefault();
    hashHistory.push("/class_form");
  },

  items(){
    if (this.state.klasses && this.state.klasses.length > 0){
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
        <Button onClick={this.createKlass}>+ Create New Class</Button>
      </div>
    );
  }



});

module.exports = KlassIndex;
