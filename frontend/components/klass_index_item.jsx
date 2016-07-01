const React = require('react');
const hashHistory = require('react-router').hashHistory;
const ListGroupItem = require('react-bootstrap').ListGroupItem;

const KlassIndexItem = React.createClass({

  goToKlass(){
    hashHistory.push(`/class/${this.props.klass.id}`);
  },

  render(){
    return(
      <ListGroupItem
        onClick={this.goToKlass}
        header={this.props.klass.name}>
        language: {this.props.klass.language.name} | teacher: {this.props.klass.teacher.username}
      </ListGroupItem>
    );
  }

});

module.exports = KlassIndexItem;
