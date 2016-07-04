const React = require('react');
const CurrentUserStore = require('../stores/current_user_store');
const StudySetActions = require('../actions/study_set_actions');
const Button = require('react-bootstrap').Button;
const StudySetStore = require('../stores/study_set_store');
// state: graded: boolean, initially false
// props: shuffled test, language_name
// clock feature
// on submit or on time limit
// --> setState to graded: true
// --> grade the test and show the right answer & score
// --> submit the result to DB

const TestForm = React.createClass({
  getInitialState(){
    return({completed: false})
  },

  componentWillMount(){
    this.words = this.props.words;
  },

  testBody(){
    let testRows = this.testRows;
    if (this.state.completed) {
      testRows = this.testRowsGraded;
    }
    return (
      <table>
        <thead>
          <tr>
            <th>English</th>
            <th>{this.props.language_name}</th>
          </tr>
        </thead>
        <tbody>
          {testRows()}
        </tbody>
      </table>
    )
  },

  testRowsGraded(){
    if (this.gradedTable) { return this.gradedTable }
    
    let score = 0;
    let rows = this.words.map( (word, idx) =>{
      let style;
      let correction;

      if (this.refs[idx].value === word[word.blank]){
        style = "correct";
        score++;
      } else {
        style = "wrong";
        correction = " correct word: " + word[word.blank];
      }

      if (word.blank === "word_english"){
        return (
          <tr className="word_row" key={`${idx}`}>
            <td key="eng" className={style}>
              {this.refs[idx].value}
              <strong className="correction">{correction}</strong>
            </td>

            <td key="for">{word.word_foreign}</td>
          </tr>
        );
      } else {
        return (
          <tr className="word_row" key={`${idx}`}>
            <td key="eng">
              {word.word_english}
            </td>

            <td key="for" className={style}>
              {this.refs[idx].value}
              <strong className="correction">{correction}</strong>
            </td>

          </tr>
        );
      }
    });
    this.score = score;
    this.gradedTable = rows;
    return rows;
  },

  testRows(){
    return this.words.map( (word, idx) => {
      if (word.blank === "word_english"){
        return (
          <tr className="word_row" key={`${idx}`}>
              <td key="eng">
                <input type="text" ref={`${idx}`} />
              </td>

              <td key="for">{word.word_foreign}</td>
          </tr>
        );
      } else {
        return (
          <tr className="word_row" key={`${idx}`}>
            <td key="eng">
              {word.word_english}
            </td>

            <td key="for">
              <input type="text" ref={`${idx}`} />
            </td>
          </tr>
        );
      }
    });
  },

  submitScore(){
    if (this.score){
      clearInterval(this.scorePending)
      let testData = {};
      testData.score = parseInt((this.score / this.words.length) * 100);
      testData.studySetId = StudySetStore.getStudySet().id;
      debugger;
      StudySetActions.submitTest(testData);
    }
  },

  submit(){
    this.setState({completed: true});
    this.scorePending = setInterval(this.submitScore, 500);
  },

  render(){
    return(
      <div>
        <h2>Fill in the blank spaces with the correct word</h2>
        {this.testBody()}
        <Button bsStyle="btn"
          onClick={this.submit}
          disabled={this.state.graded}>
          Submit
        </Button>
        <Button bsStyle="btn" onClick={this.props.closeModal}>
          Close
        </Button>

      </div>
    )
  }

});

module.exports = TestForm;
