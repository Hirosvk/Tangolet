const React = require('react');

const Welcome = React.createClass({
  render(){
    return(
      <div className="welcome">
        <h1>Welcome to Tangolet!</h1>
        <h2>Tangolet helps you memorize vocabularies in foreign languages.</h2>
        <h2>You can... </h2>

        <div className="row" >
          <div className="pane one">
            <h2>Study with Study Sets</h2>
            <ul>
              <li>Create your custom Study Sets.</li>
              <li>Learn the words through List, Flashcards, and Test features.</li>
              <li>Test scores will be saved so that you can keep track for your progress.</li>
            </ul>
          </div>

          <div className="pane two">
            <h2>Teach Classes</h2>
            <ul>
              <li>Create new Class.</li>
              <li>Add Study Sets to your Class for students to study.</li>
              <li>You can veiw your students test scores and statistics.</li>
            </ul>
          </div>
        </div>

        <div className="row" >
          <div className="pane three">
            <h2>Enroll in Class</h2>
            <ul>
              <li>Find the Enroll/Unenroll button to change your enrollment status.</li>
              <li>Teacher will make available Study Sets for you to study.</li>
              <li>Students test scores will be available to the teacher.</li>
            </ul>
          </div>

          <div className="pane four">
            <h2>Browse Classes/Study Sets</h2>
            <ul>
              <li>Use search bar to find the right classes study sets.</li>
              <li>Browse by Language.</li>
            </ul>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = Welcome;
