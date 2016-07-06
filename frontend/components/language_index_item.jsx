const React = require('react');
const ListGroupItem = require('react-bootstrap').ListGroupItem;
const hashHistory = require('react-router').hashHistory;

const LanguageIndexItem = React.createClass({

  toIndex(){
    hashHistory.push(`?option=${this.props.language.name}&lanId=${this.props.language.id}`);
  },

  render(){
    return(
      <ListGroupItem
        onClick={this.toIndex}
        header={this.props.language.name}>
        {`${this.props.language.num_of_study_sets} Study Set(s) | ${this.props.language.num_of_klasses} Class(es)`}
      </ListGroupItem>
    );
  }
});

module.exports = LanguageIndexItem;
