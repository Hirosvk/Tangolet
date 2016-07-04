const TestUtils = require('../utils/test_utils');
const AppDispatcher = require('../dispatcher/dispatcher');
const TestConstants = require('../constants/test_constants');
const TestStore = require('../stores/test_store');

const TestActions = {
  fetchScoresCurrentUser(){
    TestUtils.fetchScoresCurrentUser(this.receiveTestScores);
  },

  fetchScoresByStudySets(data){
    TestUtils.fetchScoresByStudySets(data, this.receiveTestScores);
  },

  fetchScoresByStudents(data){
    TestUtils.fetchScoresByStudents(data, this.receiveTestScores);
  },

  receiveTestScores(testScores){
    AppDispatcher.dispatch({
      actionType: TestConstants.RECEIVE_TEST_SCORES,
      testScores: testScores
    });
  },

  fetchCollectionByStudents(klassId){
    TestUtils.fetchCollectionByStudents(klassId, this.receiveCollection);
  },

  fetchCollectionByStudySets(klassId){
    TestUtils.fetchCollectionByStudySets(klassId, this.receiveCollection);
  },

  receiveCollection(testCollections){
    AppDispatcher.dispatch({
      actionType: TestConstants.RECEIVE_TEST_SCORE_COLLECTION,
      testCollections: testCollections
    });
  }


};

module.exports = TestActions;
window.TestActions = TestActions;
