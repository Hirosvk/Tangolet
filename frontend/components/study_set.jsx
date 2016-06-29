const React = require('react');
const StudySetActions = require('../actions/study_set_actions');
const StudySetStore = require('../stores/study_set_store');

const StudySet = React.createClass({
  getInitialState(){
    return ({studySet: StudySetStore.getStudySet()})
  },

  componentDidMount(){
    const id = this.props.params.id
    StudySetActions.fetchStudySet(id);
    StudySetStore.addListener(this.updateState);
  },

  updateState(){
    this.setState({studySet: StudySetStore.getStudySet()});
  },

  showDetails(){
    const studySet = this.state.studySet;
    if (studySet){
      return (
        <ul>
          <li>{studySet.name}</li>
          <li>{studySet.creator.username}</li>
          <li>{studySet.created_at}</li>
        </ul>
      )
    }
  },

  render(){
    // const children = React.Children.map(this.props.children, function(child){
    //   return React.cloneElement(child, {
    //     words: this.state.words
    //   })
    // });
    return (
      <div className="study_set">
        <h1>This is StudySet</h1>
        {this.showDetails()}
        {this.props.children}
      </div>
    )
  }
});

module.exports = StudySet;
