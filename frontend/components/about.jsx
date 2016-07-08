const React = require('react');

const About = React.createClass({
  render(){
    return(
      <div className="about">
        <h1>About Tangolet</h1>
        <h3>Thank you for visiting Tangolet!</h3>
        <br/>
        <h3>I created Tangolet to showcase my skills and knowledge in web application development. Its features and structure were inspired by <a href="http://www.quizlet.com">Quizlet</a>. "Tango" is the Japanese word for "word", or "vocabulary."</h3>
        <br />

        <h3>Please seee <a href="http://github.com/Hirosvk/Tangolet/">my Github</a> for technical information about this web app. Feel free to reach me via email: kjnhiroyuki@hotmail.com </h3>
        <br />

        <h3>Hiro Kajino</h3>

      </div>
    );
  }
});

module.exports = About;
