const React = require('react');
const StudySetActions = require('../actions/study_set_actions');
const CurrentUserStore = require('../stores/current_user_store');
const ErrorStore = require('../stores/error_store');
const hashHistory = require('react-router').hashHistory;
const StudySetStore = require('../stores/study_set_store');
const LanguageActions = require('../actions/language_actions');
const LanguageStore = require('../stores/language_store');
const Button = require('react-bootstrap').Button;
const ButtonGroup = require('react-bootstrap').ButtonGroup;
const Session = require('./session_mixin');

const WordSkeleton = function(engl, fore){
  this.word_english = engl;
  this.word_foreign = fore;
};

function deleteEmpty(oldWords){
  let newWords = [];
  oldWords.forEach( word => {
    if (!(word.word_english.length === 0 &&
        word.word_foreign.length === 0)){
      newWords.push(word);
    }
  });
  return newWords;
}

let _words;

function resetWords(){
  _words = [ new WordSkeleton("", ""),
             new WordSkeleton("", ""),
             new WordSkeleton("", "")
           ];
}



const StudySetForm = React.createClass({
  mixins: [Session],

  getInitialState(){
    return ({
      error: ErrorStore.full_errors(),
      name: "",
      languages: LanguageStore.all(),
      languagePicked: {id: 0},
      submitting: false
    });
  },

  setupEdit(){
    if (!this.id && this.props.params.action === 'edit'){
      const studySet = StudySetStore.getStudySet();

      this.setState({
        name: studySet.name,
        languagePicked: studySet.language
      });
      const toEditWords = studySet.words;
      _words = toEditWords.map( word => {
        return new WordSkeleton(word.word_english, word.word_foreign);
      });

      this.edit = true;
      this.id = studySet.id;
    }
  },

  componentWillMount(){
    resetWords();
    this.setupEdit();
  },

  componentDidMount(){
    LanguageActions.fetchAllLanguages();
    this.errorStoreListener = ErrorStore.addListener(this.receiveErrors);
    this.languageStoreListener = LanguageStore.addListener(this.receiveLanguages);
    this.studySetStoreListener = StudySetStore.addListener(this.redirectToShow);
    this.currentUserListenerSetup();
  },

  componentWillUnmount(){
    this.errorStoreListener.remove();
    this.studySetStoreListener.remove();
    this.languageStoreListener.remove();
    this.currentUserListenerRemove();
    resetWords();
    ErrorStore.resetErrors();
  },

// ---------------
// Store listeners

  redirectToShow(){
    const id = StudySetStore.getStudySet().id;
    hashHistory.push(`/study_set/${id}`);
  },

  receiveErrors(){
    this.setState({error: ErrorStore.full_errors()});
  },

  receiveLanguages(){
    this.setState({languages: LanguageStore.all()});
  },



// ----------
// form event listeners

  addMoreWords(event){
    event.preventDefault();
    _words.push(new WordSkeleton("", ""));
    this.forceUpdate();
  },

  updateWord(event){
    const id = event.target.id;
    const regex = /(\d+)_(word_english|word_foreign)/;
    const idx = id.match(regex)[1];
    const key = id.match(regex)[2];

    _words[idx][key] = event.target.value;
    this.forceUpdate();
  },

  nameChange(event){
    this.setState({name: event.target.value});
  },

  languageChange(event){
    this.setState({languagePicked: this.findLanguageById(event.target.value)});
  },

  findLanguageById(id){
    let found;
    this.state.languages.forEach( language => {
      if (language.id === parseInt(id)){
        found = language;
      }
    });
    return found;
  },


// ------
// render helpers

  showErrors(){
    if (this.state.error.responseJSON){
      return (
        <ul className="errors">
          {
            this.state.error.responseJSON.map( message => {
              return <li key={message}>{message}</li>;
            })
          }
        </ul>
      );
    } else if (this.state.error.responseText) {
      return (
        <ul className="errors">
          {
            <li>{this.state.error.responseText}</li>
          }
        </ul>
      );
    }
  },

  newWordInput(){
    return _words.map( (word, idx) => {
      return (
        <tr className="word_row" key={`${idx}row`}>
            <td><input type="text"
                   key={`english`}
                   id={`${idx}_word_english`}
                   value={_words[idx].word_english}
                   onChange={this.updateWord}
                   /></td>

            <td><input type="text"
                   key={`foreign`}
                   id={`${idx}_word_foreign`}
                   value={_words[idx].word_foreign}
                   onChange={this.updateWord}
                   /></td>
        </tr>
      );
    });
  },

  submitButton(){
    if (this.state.submitting){
      return "submitting";
    } else {
      return this.edit ? "Update" : "Create";
    }
  },

  title(){
    return this.edit ? "Edit Study Set" : "Create New Study Set";
  },

  pickedLanguage(){
    if (this.state.languagePicked.id){
      return this.state.languagePicked.name;
    } else {
      return "(select language)";
    }
  },

  languageChoices(){
    return (
    <label>Choose language<select
      defaultValue={this.state.languagePicked.id}
      onChange={this.languageChange}>
      <option value={0} key={0} ref={0} selected disabled></option>
      {
        this.state.languages.map( language => {
          return (<option
            value={language.id}
            key={language.id}
            ref={language.id}>{language.name}</option>);
        })
      }
    </select></label>
    );
  },

  render(){
    return(
      <div>
      <form className="study_set_form">
        <header className="study_set_header">

          <h4 className='title'>{this.title()}</h4>

          {this.showErrors()}

          <label className="title"><h1>Study Set name
            <input type="text" className="input_study_set_name"
                  ref="studySetName" value={this.state.name} onChange={this.nameChange}/>
          </h1></label>


          <h3>{this.languageChoices()}</h3>
        </header>


      <table>
        <thead>
          <tr>
            <th>English</th>
            <th>{this.pickedLanguage()}</th>
          </tr>
        </thead>
        <tbody>
          {this.newWordInput()}
        </tbody>
      </table>

      <ButtonGroup>
        <Button onClick={this.addMoreWords}
          disabled={this.state.submitting}>Add more words</Button>
        <Button onClick={this.sendStudySet}
          disabled={this.state.submitting}>{this.submitButton()}</Button>
      </ButtonGroup>
    </form>
    </div>
    );
  },

  sendStudySet(event){
    event.preventDefault();
    let studySetData = {};
    studySetData.studySet = {
      name: this.state.name,
      language_id: this.state.languagePicked.id
    };
    studySetData.words = deleteEmpty(_words).map(word => {
      return {
        word_english: word.word_english,
        word_foreign: word.word_foreign
      };
    });
    this.setState({submitting: true});

    if (this.edit){
      studySetData.studySet.id = this.id;
      StudySetActions.editStudySet(studySetData);
    } else {
      StudySetActions.createStudySet(studySetData);
    }
  }

});

module.exports = StudySetForm;
window.StudySetForm = StudySetForm;
