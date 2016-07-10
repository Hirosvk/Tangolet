const React = require('react');
const KlassIndex = require('./klass_index');
const StudySetIndex = require('./study_set_index');
const IndexActions = require('../actions/index_actions');
const LanguageIndex = require('./language_index');
const Welcome = require('./welcome');

const Index = React.createClass({

  getInitialState(){
    return ({
      title: "All Classes and Study Sets",
      languageId: this.props.location.query.lanId,
      option: this.props.location.query.option,
      searchFor: this.props.location.query.for
    });
  },

  componentWillMount(){
    this.setTitle(this.fetchContent);
  },

  componentWillReceiveProps(newProps){
    this.setState({
      option: newProps.location.query.option,
      searchFor: newProps.location.query.for,
      languageId: newProps.location.query.lanId
    }, this.setTitle.bind(this, this.fetchContent));
  },

  setTitle(callback){
    let title;
    if (this.state.option === "search") {
      title = `Search result for "${this.state.searchFor}"`;
    } else if (this.state.option === undefined) {
      title = `All Classes and Study Sets`;
    } else if (this.state.option === "my_classes" || this.state.option === "my_study_sets") {
      title = undefined
      // don't display title
    } else if (this.state.option === "all_languages") {
      title = "Browse by Language";
    } else {
      title = `${this.state.option} Classes and Study Sets`;
    }
    this.setState({title: title}, callback);
  },



  fetchContent(){
    if (this.state.option === "search") {
      IndexActions.search(this.state.searchFor);
    } else if (this.state.option === "my_classes") {
      IndexActions.fetchMyKlasses();
    } else if (this.state.option === "my_study_sets") {
      IndexActions.fetchMyStudySets();
    } else if (this.state.option === "all_languages"){
      IndexActions.fetchAllLanguages();
    } else if (this.state.option === undefined){
      IndexActions.fetchAllIndex();
    } else {
      IndexActions.fetchByLanguage(this.state.languageId);
    }
  },


// render helpers

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
        <LanguageIndex title="Languages" option="search" />
        <KlassIndex title="Classes" option="search"/ >
        <StudySetIndex title="Study Sets" option="search"/>
      </div>);
    } else if (this.state.option === "all_languages") {
      return (
        <LanguageIndex title="Languages" />
      );
    }

    else {
      return (<div>
        <KlassIndex title="Classes"/>
        <StudySetIndex title="Study Sets"/>
      </div>);
    }
  },


  welcome(){
    if (this.state.option === undefined){
      return <Welcome />;
    }
  },

  render(){
    return (
      <div className="index">
        {this.welcome()}
        <h1>{this.state.title}</h1>
        {this.indexContent()}
      </div>
    );
  }
});

module.exports = Index;
