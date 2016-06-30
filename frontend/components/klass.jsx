const React = require('react');
const KlassActions = require('../actions/klass_actions');
const KlassStore = require('../stores/klass_store');
const CurrentUserStore = require('../stores/current_user_store');
const hashHistory = require('react-router').hashHistory;
const StudySetIndex = require('./study_set_index');

const Klass = React.createClass({
  getInitialState(){
    return ({klass: KlassStore.getKlass()});
  },

  componentDidMount(){
    const id = this.props.params.id;
    KlassActions.fetchKlass(id);
    this.listener = KlassStore.addListener(this.updateState);
  },

  componentWillUnmount(){
    this.listener.remove();
  },

  updateState(){
    this.setState({klass: KlassStore.getKlass()});
  },

  showDetails(){
      return (
        <div className="klass_details">
          <p>Teacher: {this.state.klass.teacher.username}</p>
          <p>Description: {this.state.klass.description}</p>
        </div>
      );
  },

  redirectToIndex(resp){
    hashHistory.push("/");
  },

  deleteKlass(){
    KlassActions.deleteKlass(this.props.params.id, this.redirectToIndex);
  },

  editKlass(){
    hashHistory.push("/class_form/edit");
  },

  buttons(){
    if (CurrentUserStore.getCurrentUser().id === this.state.klass.teacher.id ){
      return (
        <div>
          <button onClick={this.deleteKlass}>Delete</button>
          <button onClick={this.editKlass}>Edit</button>
        </div>
      );
    }
  },

  render(){
    return (
      <div className="klass">
        <header className="klass_header">
          <h1>{this.state.klass.name}</h1>
          {this.showDetails()}
          {this.buttons()}
        </header>
        <StudySetIndex klassId={this.props.params.id} />
      </div>
    );
  }
});

module.exports = Klass;
