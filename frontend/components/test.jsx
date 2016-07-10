const React = require('react');
const CurrentUserStore = require('../stores/current_user_store');
const StudySetActions = require('../actions/study_set_actions');
const StudySetStore = require('../stores/study_set_store');
const Modal = require('react-bootstrap').Modal;
const Button = require('react-bootstrap').Button;
const TestForm = require('./test_form');

function shuffleWords(words){
  let shuffled = [];
  let _words = words.map( word => {
    let blank = (Math.random() > 0.5 ? "word_english" : "word_foreign" );
    return {
      word_english: word.word_english,
      word_foreign: word.word_foreign,
      blank: blank
    };
  });
  while (_words.length > 0){
    let rand = Math.floor(Math.random() * _words.length - 1);
    shuffled.push(_words.splice(rand, 1)[0]);
  }
  return shuffled;
}

const Test = React.createClass({
  getInitialState(){
    return ({testOpen: false});
  },

  componentWillMount(){
    this.testWords = [];
  },

  generateTest(){
    if (this.props.words.length <= 10){
      this.testWords = shuffleWords(this.props.words);
    } else {
      this.testWords = shuffleWords(this.props.words).splice(0,10);
    }
    this.setState({testOpen: true});
  },

  closeModal(){
    this.setState({testOpen: false});
  },

  render(){
    let num, min, sec;
    if (this.props.words.length < 10) {
      num = (this.props.words.length).toString();
      min = Math.floor(this.props.words.length / 2).toString();
      sec = (this.props.words.length % 2) ? "30" : "00";
    } else {
      num = "10"
      min = "5";
      sec = "00";
    }
    return(
      <div className="test">
        <Modal show={this.state.testOpen} bsStyle="test-modal">
          <TestForm words={this.testWords}
                    language_name={this.props.language_name}
                    closeModal={this.closeModal}/>
        </Modal>

        <span>
          <ul>
            <h2>Test Guidelines</h2>
            <li><h3>Test will be randomly generated</h3></li>
            <li><h3>{`There will be ${num} questions.`}</h3></li>
            <li><h3>{`You have ${min}:${sec} to finish.`}</h3></li>
            <li><h3>
              When the time runs out, Test will be submitted automatically
            </h3></li>
            <li><h3>
              Good luck!
            </h3></li>

          </ul>
        </span>
        <Button onClick={this.generateTest}>Begin Test</Button>
      </div>
    );
  }

});

module.exports = Test;
