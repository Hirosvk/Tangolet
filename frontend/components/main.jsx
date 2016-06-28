const React = require('react');

const Main = React.createClass({
  render(){
    return (
      <main>
        <h1>This is Main</h1>
        {this.props.children}
      </main>
    );
  }
});

module.exports = Main;
