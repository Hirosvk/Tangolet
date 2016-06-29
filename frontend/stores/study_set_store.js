const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const StudySetConstants = require('../constants/study_set_constants');

const StudySetStore = new Store(AppDispatcher);

let _studySet;

StudySetStore.getStudySet = function(){
  return _studySet;
};

StudySetStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case StudySetConstants.RECEIVE_STUDY_SET:
      _studySet = payload.studySet;
      this.__emitChange();
      break;
  }
};

module.exports = StudySetStore;
window.StudySetStore = StudySetStore;
