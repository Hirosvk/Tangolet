const React = require('react');
const Navigation = require('./navigation_mixin');

const Welcome = React.createClass({
  mixins: [Navigation],
  render(){
    return(
      <div className="welcome">
        {this.modals()}
        <h1>Welcome to Tangolet!</h1>
        <h2>Tangolet helps you memorize vocabularies in foreign languages.</h2>
        <h2>You can... </h2>

        <div className="row" >
          <div className="pane one">
            <h2>Learn with Study Sets</h2>
            <ul>
              <li>Create your custom <a onClick={this.toCreateStudySet}>Study Sets</a>.</li>
              <li><a onClick={this.toMyStudySets}>Learn the words through List, Flashcards, and Test features.</a></li>
              <li><a onClick={this.toMyTestScores}>See you past Test scores.</a></li>
            </ul>
          </div>

          <div className="pane two">
            <h2>Manage Classes</h2>
            <ul>
              <li><a onClick={this.toCreateClass}>Create new Class.</a></li>
              <li><a onClick={this.toMyKlasses} >Add Study Sets to your Class for your students to study.</a></li>
              <li><a onClick={this.toMyKlasses}>You can veiw your students test scores.</a></li>
            </ul>
          </div>
        </div>

        <div className="row" >
          <div className="pane three">
            <h2>Enroll in Classes</h2>
            <ul>
              <li><a onClick={this.myKlasses} >Chnage your enrollment status with Enroll/Unenroll button.</a></li>
              <li>Teacher will make available Study Sets for you to study.</li>
              <li>Students test scores will be available to the teacher.</li>
            </ul>
          </div>

          <div className="pane four">
            <h2>Browse Classes/Study Sets</h2>
            <ul>
              <li>Use search bar to find the right classes study sets.</li>
              <li><a onClick={this.toLanguages}>Browse by Language.</a></li>
            </ul>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = Welcome;
