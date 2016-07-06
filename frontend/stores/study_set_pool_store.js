const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const IndexConstants = require('../constants/index_constants');

const StudySetPoolStore = new Store(AppDispatcher);

let _studySets = [];

StudySetPoolStore.getStudySets = function(){
  return _studySets;
};

StudySetPoolStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case IndexConstants.FILL_STUDY_SET_POOL:
      _studySets = payload.studySets;
      this.__emitChange();
      break;
  }
};

module.exports = StudySetPoolStore;
window.StudySetPoolStore = StudySetPoolStore;
