const React = require('react');

const Content = React.createClass({
  render(){
    return (
      <div class="content">
        <p>guest log-in hasn't been created. use(username: Hiro, password: hirohiro)</p>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Content;
