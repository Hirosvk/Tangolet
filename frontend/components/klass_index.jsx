const React = require('react');
const IndexStore = require('../stores/index_store');
const IndexActions = require('../actions/index_actions');
const KlassIndexItem = require('./klass_index_item');

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

  render(){
    return(
      <div className="klass_index">
        <h1>Class Index</h1>
        {
          this.state.klasses.map( klass => {
            return <KlassIndexItem klass={klass} key={klass.id}/>;
          })
        }
      </div>
    );
  }



});

module.exports = KlassIndex;
