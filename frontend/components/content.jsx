const React = require('react');

const Content = React.createClass({
  render(){
    return (
      <div id="content">
        <h1>This is Content</h1>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Content;
