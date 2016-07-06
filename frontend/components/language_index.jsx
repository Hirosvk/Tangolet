const React = require('react');
const IndexStore = require('../stores/index_store');
const IndexActions = require('../actions/index_actions');
const Button = require('react-bootstrap').Button;
const hashHistory = require('react-router').hashHistory;
const ListGroup = require('react-bootstrap').ListGroup;

const LanguageIndex = React.createClass({
  getInitialState(){
    return({languages: IndexStore.getLanguages()});
  },

  componentWillMount(){
    this.indexListener = IndexStore.addListener(this.updateState);
  },

  componentDidMount(){
    this.fetchBasedOnProps();
  },

  componentWillReceiveProps(newProps){
    this.fetchBasedOnProps(newProps);
  },

  componentWillUnmount(){
    this.indexListener.remove();
    this.indexListener = undefined;
  },

  fetchBasedOnProps(newProps){
    const option = newProps ? newProps.option : this.props.option;
    if (option === "search") {
      // does not fetch
    } else {
      IndexActions.getLanguageIndex();
    }
  },

  render(){
    const title = "Languages";
    console.log(this.state.languages);
    return (
      <div className="language-index">
        {title}
        <ListGroup>
          {this.state.languages.map(language => {
            return <p>{language.name}</p>;
          })}
        </ListGroup>
      </div>
    );
  }
});

module.exports = LanguageIndex;
