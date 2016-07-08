const React = require('react');
const IndexActions = require('../actions/index_actions');
const LanguageIndexStore = require('../stores/language_index_store');
const Button = require('react-bootstrap').Button;
const hashHistory = require('react-router').hashHistory;
const ListGroup = require('react-bootstrap').ListGroup;
const LanguageIndexItem = require('./language_index_item');

const LanguageIndex = React.createClass({
  getInitialState(){
    return({languages: LanguageIndexStore.getLanguages()});
  },

  componentDidMount(){
    this.indexListener = LanguageIndexStore.addListener(this.updateState);
  },

  updateState(){
    this.setState({languages: LanguageIndexStore.getLanguages()});
  },

  componentWillUnmount(){
    this.indexListener.remove();
    this.indexListener = undefined;
  },

  items(){
    if (this.state.languages.length > 0){
      return this.state.languages.map(language => {
        return <LanguageIndexItem key={language.id} language={language} />;
      });
    } else {
      return <h2>No Languages</h2>;
    }
  },


  render(){
    const title = <h1 className="title">{this.props.title}</h1>;
    return (
      <div className="language-index">
        {title}
        <ListGroup>
          {this.items()}
        </ListGroup>
      </div>
    );
  }
});

module.exports = LanguageIndex;
