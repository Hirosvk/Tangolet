const React = require('react');
const KlassActions = require('../actions/klass_actions');
const CurrentUserStore = require('../stores/current_user_store');
const ErrorStore = require('../stores/error_store');
const hashHistory = require('react-router').hashHistory;
const KlassStore = require('../stores/klass_store');
const LanguageStore = require('../stores/language_store');
const LanguageActions = require('../actions/language_actions');
const Button = require('react-bootstrap').Button;
const ButtonGroup = require('react-bootstrap').ButtonGroup;


const KlassForm = React.createClass({

  getInitialState(){
    return ({
      error: ErrorStore.full_errors(),
      name: "",
      description: "",
      languages: LanguageStore.all(),
      language_id: 0,
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
    this.KlassStoreListener = KlassStore.addListener(this.redirectToShow);
    this.userListener = CurrentUserStore.addListener(this.redirectToIndex);
  },

  componentWillUnmount(){
    this.languageStoreListener.remove();
    this.errorStoreListener.remove();
    this.KlassStoreListener.remove();
    this.userListener.remove();
    ErrorStore.resetErrors();
  },

// --------------
// Store listeners

  redirectToIndex(){
    if (CurrentUserStore.getCurrentUser().id === undefined) {
      hashHistory.push('/');
    }
  },

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

  submitButton(){
    return this.edit ? "Update" : "Create";
  },

  title(){
    return this.edit ? "Edit Class" : "Create New Class";
  },

  languageChoices(){
    return (
    <label className="item"><h4>Choose language<select
      defaultValue={this.state.language_id}
      onChange={this.languageChange}>
      <option value={0} key={0} ref={0} disabled></option>
      {
        this.state.languages.map( language => {
          return (<option value={language.id}
            key={language.id}
            ref={language.id}>{language.name}</option>);
        })
      }
    </select></h4></label>
    );
  },

  render(){
    return(
      <div>
      <form className="klass_form">
        <header className="klass_header" >
        <h4 className="title">{this.title()}</h4>
        {this.showErrors()}

        <label><h1>Class Name
          <input className="input_klass_name"
                 type="text"
                 id="name"
                 value={this.state.name}
                 onChange={this.updateState}/>
        </h1></label>

        </header>
          <div className="details">
          <label className="item"><h4>Description
            <textarea id="description" value={this.state.description} onChange={this.updateState}/>
          </h4></label>

          {this.languageChoices()}

          <Button bsClass="item btn" onClick={this.sendKlass}>{this.submitButton()}</Button>
        </div>
      </form>
    </div>
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
      KlassActions.editKlass(klassData);
    } else {
      KlassActions.createKlass(klassData);
    }
  }



});

module.exports = KlassForm;
window.KlassForm = KlassForm;
