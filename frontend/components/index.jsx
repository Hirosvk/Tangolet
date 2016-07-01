const React = require('react');
const KlassIndex = require('./klass_index');
const StudySetIndex = require('./study_set_index');

const Index = React.createClass({

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
        <KlassIndex title="Classes"/>
        <StudySetIndex title="Study Sets"/>
      </div>
    );
  }
});

module.exports = Index;
