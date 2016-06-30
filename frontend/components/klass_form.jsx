const React = require('react');
const KlassActions = require('../actions/klass_actions');
const CurrentUserStore = require('../stores/current_user_store');
const ErrorStore = require('../stores/error_store');
const hashHistory = require('react-router').hashHistory;
const KlassStore = require('../stores/klass_store');
const LanguageStore = require('../stores/language_store');
const LanguageActions = require('../actions/language_actions');


const KlassForm = React.createClass({

  getInitialState(){
    return ({
      error: ErrorStore.full_errors(),
      name: "",
      description: "",
      languages: LanguageStore.all(),
      language_id: undefined
    });
  },

  setupEdit(){
    if (!this.id && this.props.params.action === 'edit'){
      const klass = KlassStore.getKlass();
      this.edit = true;
      this.id = klass.id;

      this.setState({
        name: klass.name,
        description: klass.description,
        language_id: klass.language.id
      });
    }
  },

  componentWillMount(){
    this.setupEdit();
  },

  componentDidMount(){
    LanguageActions.fetchAllLanguages();
    this.languageStoreListener = LanguageStore.addListener(this.receiveLanguages);
    this.errorStoreListener = ErrorStore.addListener(this.receiveErrors);
    this.studySetStoreListener = KlassStore.addListener(this.redirectToShow);
  },

  componentWillUnmount(){
    this.languageStoreListener.remove();
    this.errorStoreListener.remove();
    this.studySetStoreListener.remove();
    ErrorStore.resetErrors();
  },

// --------------
// Store listeners

  redirectToShow(){
    const id = KlassStore.getKlass().id;
    hashHistory.push(`/class/${id}`);
  },

  receiveErrors(){
    this.setState({error: ErrorStore.full_errors()});
  },

  receiveLanguages(){
    this.setState({languages: LanguageStore.all()});
  },



// -------------
// form event listeners

  updateState(event){
    let newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  },

  languageChange(event){
    this.setState({language_id: event.target.value});
  },

// -------------
// render helpers

  showErrors(){
    if (this.state.error.responseJSON){
      return (
        <ul classNam="errors">
          {
            this.state.error.responseJSON.map( message => {
              return <li key={message}>{message}</li>;
            })
          }
        </ul>
      );
    } else if (this.state.error.responseText) {
      return (
        <ul classNam="errors">
          {
            <li>{this.state.error.responseText}</li>
          }
        </ul>
      );
    }
  },

  submitButton(){
    return this.edit ? "Update" : "Create";
  },

  title(){
    return this.edit ? "Edit Class" : "Create New Class";
  },

  languageChoices(){
    return (
    <label>Choose language<select
      defaultValue={this.state.language_id}
      onChange={this.languageChange}>
      {
        this.state.languages.map( language => {
          return (<option value={language.id}
            key={language.id}
            ref={language.id}>{language.name}</option>);
        })
      }
    </select></label>
    );
  },

  render(){
    return(
      <form className="klass_form">
        <h1>{this.title()}</h1>
        {this.showErrors()}

        <label>Class Name
        <input type="text" id="name" value={this.state.name} onChange={this.updateState}/></label>
        <br />
        <label>Description
        <textarea id="description" value={this.state.description} onChange={this.updateState}/></label>

        {this.languageChoices()}

        <button onClick={this.sendKlass}>{this.submitButton()}</button>
      </form>
    );
  },

  sendKlass(event){
    event.preventDefault();
    let klassData = {};
    klassData.name = this.state.name;
    klassData.description = this.state.description;
    klassData.language_id = this.state.language_id;

    if (this.edit){
      klassData.id = this.id;
      console.log(klassData);
      KlassActions.editKlass(klassData);
    } else {
      console.log(klassData);
      KlassActions.createKlass(klassData);
    }
  }



});

module.exports = KlassForm;
window.KlassForm = KlassForm;
