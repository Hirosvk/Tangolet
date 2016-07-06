const React = require('react');
const KlassIndex = require('./klass_index');
const StudySetIndex = require('./study_set_index');
const IndexActions = require('../actions/index_actions');
const LanguageIndex = require('./language_index');

const Index = React.createClass({

  getInitialState(){
    return ({
      title: "All Classes and Study Sets",
      option: this.props.location.query.option,
      searchFor: this.props.location.query.for
    });
  },

  indexContent(){
    if (this.state.option === "my_study_sets"){
      return <StudySetIndex title="Study Sets I created" option="myStudySets" />;
    } else if (this.state.option === "my_classes") {
      return (
        <div>
          <KlassIndex title="Classes I teach" option="createdKlasses" />
          <KlassIndex title="Classes I'm enrolled in " option="enrolledKlasses" />
        </div>
      );
    } else if (this.state.option === "search") {
      return (<div>
        <LanguageIndex option="search" />
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
    this.setTitle(this.doSearch);
    // this.doSearch();
  },

  componentWillReceiveProps(newProps){
    this.setState({
      option: newProps.location.query.option,
      searchFor: newProps.location.query.for
    }, this.setTitle.bind(this, this.doSearch));
  },

  setTitle(callback){
    if (this.state.option === "search") {
      this.setState({title: `Search result for "${this.state.searchFor}"`,
      }, callback);
    } else if (this.state.option === undefined) {
      this.setState({title: `All Classes and Study Sets`}, callback);
    } else {
      this.setState({title: undefined}, callback);
    }
  },



  doSearch(){
      if (this.state.option === "search") {
      IndexActions.search(this.state.searchFor);
    }
  },

  studySetOption(){
    const option = this.props.location.query.option;
    if (option === "my_study_sets"){
      return "myStudySets";
    }
  },


  render(){
    return (
      <div className="index">
        <h1>{this.state.title}</h1>
        {this.indexContent()}
      </div>
    );
  }
});

module.exports = Index;
