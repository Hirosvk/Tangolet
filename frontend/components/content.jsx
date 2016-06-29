const React = require('react');

const Content = React.createClass({
  render(){
    return (
      <div id="content">
        <p>This is Content</p>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Content;
