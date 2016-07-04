const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const TestConstants = require('../constants/test_constants');

let _testScores = [];
let _testCollections = [];

const TestStore = new Store(AppDispatcher);

TestStore.getTestScores = function(){
  return _testScores;
};

TestStore.getTestCollection = function(){
  return _testCollections;
};

TestStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case TestConstants.RECEIVE_TEST_SCORES:
      _testScores = payload.testScores;
      this.__emitChange();
      break;
    case TestConstants.RECEIVE_TEST_SCORE_COLLECTION:
      _testCollections = payload.testCollections;
      this.__emitChange();
      break;
  }
};


module.exports = TestStore;
window.TestStore = TestStore;
