const React = require('react');
const KlassIndex = require('./klass_index');
const StudySetIndex = require('./study_set_index');
const IndexActions = require('../actions/index_actions');

const Index = React.createClass({

  indexContent(){
    const option = this.props.location.query.option;
    if (option === "my_study_sets"){
      return <StudySetIndex title="Study Sets I created" option="myStudySets" />;
    } else if (option === "my_classes") {
      return (
        <div>
          <KlassIndex title="Classes I teach" option="createdKlasses" />
          <KlassIndex title="Classes I'm enrolled in " option="enrolledKlasses" />
        </div>
      );
    } else if (option === "search") {
      return (<div>
        <KlassIndex title="Classes" option="search"/ >
        <StudySetIndex title="Study Sets" option="search"/>
      </div>);
    } else {
      return (<div>
        <KlassIndex title="Classes"/>
        <StudySetIndex title="Study Sets"/>
      </div>);
    }
  },

  componentDidMount(){
    this.doSearch();
  },

  componentWillReceiveProps(newProps){
    this.doSearch(newProps);
  },

  doSearch(newProps){
    const props = newProps || this.props;
    if (props.location.query.option === "search") {
      IndexActions.search(props.location.query.for);
    }
  },

  studySetOption(){
    const option = this.props.location.query.option;
    if (option === "my_study_sets"){
      return "myStudySets";
    }
  },

  indexTitle(){
    if (!this.props.title){
      return "All Classes and Study Sets";
    } else {
      return this.props.title;
    }
  },

  render(){
    return (
      <div className="index">
        <h1>{this.indexTitle()}</h1>
        {this.indexContent()}
      </div>
    );
  }
});

module.exports = Index;
