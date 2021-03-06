const React = require('react');
const SessionActions = require('../actions/session_actions');
const hashHistory = require('react-router').hashHistory;
import {Glyphicon} from 'react-bootstrap';

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
