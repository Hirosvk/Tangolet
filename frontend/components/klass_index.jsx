const React = require('react');
const IndexStore = require('../stores/index_store');
const IndexActions = require('../actions/index_actions');
const KlassIndexItem = require('./klass_index_item');
const Button = require('react-bootstrap').Button;
const hashHistory = require('react-router').hashHistory;

const KlassIndex = React.createClass({

  getInitialState(){
    return ({klasses: IndexStore.getKlasses()});
  },

  componentDidMount(){
    IndexActions.getKlassIndex();
    this.indexListener = IndexStore.addListener(this.updateState);
  },

  updateState(){
    this.setState({klasses: IndexStore.getKlasses()});
  },

  componentWillUnmount(){
    this.indexListener.remove();
  },

  createKlass(event){
    event.preventDefault();
    hashHistory.push("/class_form");
  },

  render(){
    return(
      <div className="klass_index">
        <h1>{this.props.title}</h1>
        {
          this.state.klasses.map( klass => {
            return <KlassIndexItem klass={klass} key={klass.id}/>;
          })
        }
        <Button onClick={this.createKlass}>+ Create New Class(dev.)</Button>
      </div>
    );
  }



});

module.exports = KlassIndex;
