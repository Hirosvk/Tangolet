const React = require('react');
const SideNavbar = require('./side_navbar');

const Content = React.createClass({
  render(){
    return (
      <div className="content">
        <SideNavbar />
        {this.props.children}
      </div>
    );
  }
});

module.exports = Content;
