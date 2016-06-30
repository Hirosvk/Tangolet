const React = require('react');
const KlassActions = require('../actions/klass_actions');
const CurrentUserStore = require('../stores/current_user_store');
const ErrorStore = require('../stores/error_store');
const hashHistory = require('react-router').hashHistory;
const KlassStore = require('../stores/klass_store');

const KlassForm = React.createClass({

  getInitialState(){
    return ({
      error: ErrorStore.full_errors(),
      name: "",
      description: ""
    });
  },

  setupEdit(){
    if (!this.id && this.props.params.action === 'edit'){
      const klass = KlassStore.getKlass();
      this.edit = true;
      this.id = klass.id;

      this.setState({name: klass.name});
      this.setState({description: klass.description});
    }
  },

  componentWillMount(){
    this.setupEdit();
  },

  componentDidMount(){
    this.errorStoreListener = ErrorStore.addListener(this.receiveErrors);
    this.studySetStoreListener = KlassStore.addListener(this.redirectToShow);
  },

  componentWillUnmount(){
    this.errorStoreListener.remove();
    this.studySetStoreListener.remove();
    ErrorStore.resetErrors();
  },

  redirectToShow(){
    const id = KlassStore.getKlass().id;
    hashHistory.push(`/klass/${id}`);
  },

  receiveErrors(){
    this.setState({error: ErrorStore.full_errors()});
  },


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

  sendKlass(event){
    event.preventDefault();
    let klassData = {};
    klassData.name = this.state.name;
    klassData.description = this.state.description;

    if (this.edit){
      klassData.id = this.id;
      KlassActions.editKlass(klassData);
    } else {
      KlassActions.createKlass(klassData);
    }
  },

  updateState(event){
    let newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  },

  submitButton(){
    return this.edit ? "Update" : "Create";
  },

  title(){
    return this.edit ? "Edit Class" : "Create New Class";
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

        <button onClick={this.sendKlass}>{this.submitButton()}</button>
      </form>
    );
  }

});

module.exports = KlassForm;
window.KlassForm = KlassForm;
