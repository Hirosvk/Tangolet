const React = require('react');

const About = React.createClass({
  render(){
    return(
      <div className="about">
        <h1>About Tangolet</h1>
        <h3>Thank you for visiting Tangolet!</h3>
        <br/>
        <h3>I created Tangolet to showcase my skills and knowledge in web application development. Its features and structure were inspired by <a href="http://www.quizlet.com">Quizlet</a>. "Tango" means "word" or "vocabulary" in Japanese.</h3>
        <br />

        <h3>Please seee <a href="http://github.com/Hirosvk/Tangolet/">my Github</a> for technical information about this web app. </h3>
        <br />

        <h3>Hiro Kajino</h3>

      </div>
    );
  }
});

module.exports = About;
