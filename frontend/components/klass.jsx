const React = require('react');
const KlassActions = require('../actions/klass_actions');
const KlassStore = require('../stores/klass_store');
const CurrentUserStore = require('../stores/current_user_store');
const hashHistory = require('react-router').hashHistory;
const StudySetIndex = require('./study_set_index');
const AddStudySetForm = require('./add_study_set_form');

const Klass = React.createClass({
  getInitialState(){
    return ({
      klass: KlassStore.getKlass(),
      enrollmentStatus: this.enrollmentStatus()
    });
  },

  componentDidMount(){
    const id = this.props.params.klassId;
    KlassActions.fetchKlass(id);
    this.listener = KlassStore.addListener(this.updateState);
    this.userListener = CurrentUserStore.addListener(this.updateEnrollment);
  },

  componentWillUnmount(){
    this.listener.remove();
    this.userListener.remove();
  },

  enrollmentStatus(){
    const id = parseInt(this.props.params.klassId);
    return (CurrentUserStore.klassIds().indexOf(id) >= 0);
  },


// store listeners

  updateState(){
    this.setState({klass: KlassStore.getKlass()});
  },

  updateEnrollment(){
    this.setState({enrollmentStatus: this.enrollmentStatus()});
  },

  redirectToIndex(resp){
    hashHistory.push("/");
  },

// -------------
// actions and redirections

  deleteKlass(){
    KlassActions.deleteKlass(this.props.params.klassId, this.redirectToIndex);
  },

  editKlass(){
    hashHistory.push("/class_form/edit");
  },

  addStudySets(){
    hashHistory.push(`/class/${this.props.params.klassId}/add_study_sets`);
  },

  toggleEnrollment(){
    KlassActions.toggleEnrollment(this.props.params.klassId);
  },



// -----------
// render helpers

  showDetails(){
      return (
        <div className="klass_details">
          <p>Teacher: {this.state.klass.teacher.username}</p>
          <p>Description: {this.state.klass.description}</p>
          <p>Language: {this.state.klass.language.name}</p>
        </div>
      );
  },


  buttons(){
    const currentUser = CurrentUserStore.getCurrentUser();
    if (currentUser.id === this.state.klass.teacher.id ){
      return (
        <div>
          <button onClick={this.deleteKlass}>Delete</button>
          <button onClick={this.editKlass}>Edit</button>
          <button onClick={this.addStudySets}>Add Study Sets</button>
        </div>
      );
    } else if (currentUser.id) {
      if (this.state.enrollmentStatus){
        return <button onClick={this.toggleEnrollment}>Unenroll</button>;
      } else {
        return <button onClick={this.toggleEnrollment}>Enroll</button>;
      }
    }
  },

  render(){
    let children = React.cloneElement(this.props.children, {
      klassId: this.props.params.klassId
    });
    console.log(this.state.enrollmentStatus);
    return (
      <div className="klass">
        <header className="klass_header">
          <h1>{this.state.klass.name}</h1>
          {this.showDetails()}
          {this.buttons()}
        </header>
        {children}
      </div>
    );
  }
});

module.exports = Klass;
