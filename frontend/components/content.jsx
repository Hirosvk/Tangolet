const React = require('react');

const Content = React.createClass({
  render(){
    return (
      <div className="content">
        {this.props.children}
      </div>
    );
  }
});

module.exports = Content;
