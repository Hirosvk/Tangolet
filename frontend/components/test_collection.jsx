const React = require('react');
const TestStore = require('../stores/test_store');
const TestActions = require('../actions/test_actions');
const KlassStore = require('../stores/klass_store');
const ListGroup = require('react-bootstrap').ListGroup;
const ListGroupItem = require('react-bootstrap').ListGroupItem;
const TestScoreIndex = require('./test_score_index');
const Button = require('react-bootstrap').Button;

const TestCollection = React.createClass({
  getInitialState(){
    return ({testCollections: TestStore.getTestCollections(),
            status: false,
            indexShow: false});
  },

  componentDidMount(){
    this.klassId = KlassStore.getKlass().id;
    this.option = this.props.option;

    this.fetchCollection();
    this.listener = TestStore.addListener(this.updateState);
    this.klassListener = KlassStore.addListener(this.fetchCollection);
  },

  fetchCollection(){
    if (this.option === "by_students"){
      TestActions.fetchCollectionByStudents(this.klassId);
    } else if (this.option === "by_study_sets"){
      TestActions.fetchCollectionByStudySets(this.klassId);
    }
  },

  componentWillUnmount(){
    this.listener.remove();
    this.klassListener.remove();
  },

  componentWillReceiveProps(newProps){
    this.option = newProps.option;
    if (this.setState) { this.setState({indexShow: false}); }
    this.fetchCollection();
  },


  updateState(){
    this.setState({testCollections: TestStore.getTestCollections()});
  },

  goToTestScoreIndex(event){
    event.preventDefault();
    let data = {klassId: this.klassId};
    const idx = event.currentTarget.id;
    this.id = this.state.testCollections[idx].id;
    this.collectionName = this.state.testCollections[idx].name;
    this.setState({indexShow: true});
  },

  content(){
    if (this.state.indexShow){
      if (this.option === "by_students"){
        return <TestScoreIndex
          klassId={this.klassId}
          studentId={this.id}
          title={`${this.collectionName}'s test scores'`}
          />;
      } else if (this.option === "by_study_sets") {
        return <TestScoreIndex
          klassId={this.klassId}
          studySetId={this.id}
          title={`${this.collectionName} | test scores`}
          />;
      }
    } else {
      if (this.state.testCollections.length === 0){
        return <h2>No one has taken tests yet</h2>;
      } else {
        return this.state.testCollections.map((testCollection, idx) => {
          return (
            <ListGroupItem key={testCollection.id}
              id={idx}
              header={testCollection.name}
              onClick={this.goToTestScoreIndex}>
              Average Score: {testCollection.average_score} | Num of Tests Taken: {testCollection.num_of_tests_taken}
            </ListGroupItem>
          );
        });
      }
    }
  },

  backToCollection(){
    this.setState({indexShow: false});
  },

  backButton(){
    if (this.state.indexShow){
      return <Button onClick={this.backToCollection}>Back</Button>;
    }
  },

  render(){
    return(
      <ListGroup>
        {this.content()}
        {this.backButton()}
      </ListGroup>
    );
  }

});

module.exports = TestCollection;
