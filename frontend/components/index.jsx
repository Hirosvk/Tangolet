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
      searchFor: this.props.location.query.for,
      joyrideAdded: false
    });
  },

  joyrideSteps: [
    {
      title: "Click to Explore",
      text: "Click the link to experience the full features.",
      selector: '.list-group-item',
      position: 'left',
      type: 'hover'
    }
  ],

  componentWillMount(){
    this.setTitle(this.fetchContent);
  },

  componentDidUpdate(){
    this.joyrideInterval = setInterval(function(){
      if (document.getElementsByClassName('list-group-item').length > 0 && !this.state.joyrideAdded){
        this.props.addSteps(this.joyrideSteps);
        this.setState({joyrideAdded: true});
        clearInterval(this.joyrideInterval);
      }
    }.bind(this), 100);
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
      title = undefined;
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
      return <StudySetIndex addSteps={this.props.addSteps} title="Study Sets I created" option="myStudySets" />;
    } else if (this.state.option === "my_classes") {
      return (
        <div>
          <KlassIndex addSteps={this.props.addSteps} title="Classes I teach" option="createdKlasses" />
          <KlassIndex addSteps={this.props.addSteps} title="Classes I'm enrolled in " option="enrolledKlasses" />
        </div>
      );
    } else if (this.state.option === "search") {
      return (<div>
        <LanguageIndex title="Languages" option="search" />
        <KlassIndex addSteps={this.props.addSteps} title="Classes" option="search"/ >
        <StudySetIndex addSteps={this.props.addSteps} title="Study Sets" option="search"/>
      </div>);
    } else if (this.state.option === "all_languages") {
      return (
        <LanguageIndex title="Languages" />
      );
    }

    else {
      return (<div>
        <KlassIndex addSteps={this.props.addSteps} title="Classes"/>
        <StudySetIndex addSteps={this.props.addSteps} title="Study Sets"/>
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
