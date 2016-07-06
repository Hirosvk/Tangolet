const React = require('react');
const CurrentUserStore = require('../stores/current_user_store');
const SessionActions = require('../actions/session_actions');
const hashHistory = require('react-router').hashHistory;
const Glyphicon = require('react-bootstrap').Glyphicon;

const SearchBar = React.createClass({

  search(){
    const searchText = this.refs.searchText.value;
    hashHistory.push(`?option=search&for=${searchText}`);
  },

  render(){
    return (
      <div className="search-bar">
        <h3>
        <input type="text" ref="searchText"
          placeholder="Search..... "></input>
        <button className="btn" onClick={this.search}>
          <Glyphicon glyph="search" />
        </button>
        </h3>
      </div>
    );
  }
});

module.exports = SearchBar;
