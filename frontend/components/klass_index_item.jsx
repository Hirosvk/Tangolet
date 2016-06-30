const React = require('react');
const hashHistory = require('react-router').hashHistory;

const KlassIndexItem = React.createClass({

  goToKlass(){
    hashHistory.push(`/class/${this.props.klass.id}`);
  },

  render(){
    return(
      <div className="klass_index_item">
        <a onClick={this.goToKlass}>
          <p>name: {this.props.klass.name}</p>
          <p>creator: {this.props.klass.teacher.username}</p>
        </a>
      </div>
    );
  }

});

module.exports = KlassIndexItem;
