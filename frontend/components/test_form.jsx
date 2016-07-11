const React = require('react');
const CurrentUserStore = require('../stores/current_user_store');
const StudySetActions = require('../actions/study_set_actions');
const Button = require('react-bootstrap').Button;
const StudySetStore = require('../stores/study_set_store');
const ErrorStore = require('../stores/error_store');

const TestForm = React.createClass({
  getInitialState(){
    return({
      completed: false,
      sent: false,
      timeRem: (this.props.words.length * 30),
      min: "",
      sec: ""});
  },

  componentWillMount(){
    this.words = this.props.words;
  },

  componentDidMount(){
    this.clock = setInterval(this.tick, 1000);
  },

  componentWillUnmount(){
    ErrorStore.resetErrors();
    if (this.errorListener){
      this.errorListener.remove();
    }
    clearInterval(this.clock);
  },

  tick(){
    if (this.state.timeRem > 0){
      this.setState({ timeRem: this.state.timeRem - 1 });
    } else {
      this.submit();
    }
  },

// render helpers

  timer(){
    const time = this.state.timeRem;
    let min = parseInt(time / 60).toString();
    let sec = parseInt(time % 60);
    if (sec < 10){
      sec = "0" + sec.toString();
    } else {
      sec = sec.toString();
    }

    if (!this.state.completed){
      return <h3>
        {`Time Remaining ${min}:${sec}`}
      </h3>;
    }
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
    );
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


  testRowsGraded(){
    if (this.gradedTable) { return this.gradedTable; }
    // re-render occurs when TestForm receives response from
    // server. We don't want to grade the test again when that happens.

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

  topMessage(){
    if (this.state.sent){
      return <h2>{`Score: ${parseInt((this.score / this.words.length) * 100)}`}</h2>;
    } else {
      return <h2>Fill in the blank spaces with the correct word</h2>;
    }
  },

  setServerResp(){
    const message = ErrorStore.full_errors().responseText;
    // ErrorStore is not appropriately named for Test view.
    // this function renders success message as well.
    if (message){
      this.serverResp = <h2>{message}</h2>;
        this.setState({sent: true});
    }
  },

  exitButton(){
    let text;
    if (this.state.sent) {
      text = "Exit";
    } else {
      text = "Quit";
    }
    return (<Button bsStyle="btn" onClick={this.props.closeModal}>
      {text}
    </Button>);
  },


  render(){
    // this.serverResp is an instance var set by setServerResp()
    return(
      <div className="test-form">
        {this.topMessage()}
        {this.serverResp}
        {this.timer()}
        {this.testBody()}
        <Button bsStyle="btn"
          onClick={this.submit}
          disabled={this.state.completed}>
          Submit
        </Button>
        {this.exitButton()}

      </div>
    );
  },

  submitScore(){
    if (this.score !== undefined){
      // in JavasScript, 0 is falsey
      clearInterval(this.scorePending);
      let testData = {};
      testData.score = parseInt((this.score / this.words.length) * 100);
      testData.studySetId = StudySetStore.getStudySet().id;
      this.errorListener = ErrorStore.addListener(this.setServerResp);
      StudySetActions.submitTest(testData);
    }
  },

  submit(){
    this.setState({completed: true});
    this.scorePending = setInterval(this.submitScore, 500);
    // waits until the test score is computed.
    clearInterval(this.clock);
  }

});

module.exports = TestForm;
