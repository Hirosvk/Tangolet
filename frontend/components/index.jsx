const React = require('react');
const KlassIndex = require('./klass_index');
const StudySetIndex = require('./study_set_index');

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
    } else {
      return (<div>
        <KlassIndex title="Classes"/>
        <StudySetIndex title="Study Sets"/>
      </div>);
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
