const React = require('react');
const KlassIndex = require('./klass_index');
const StudySetIndex = require('./study_set_index');

const Index = React.createClass({
  render(){
    return (
      <div className="index">
        <h1>This is Index</h1>
        <KlassIndex />
        <StudySetIndex />
      </div>
    );
  }
});

module.exports = Index;
