const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const IndexConstants = require('../constants/index_constants');
const KlassConstants = require('../constants/klass_constants');

const StudySetIndexStore = new Store(AppDispatcher);

let _studySets = [];

StudySetIndexStore.getStudySets = function(){
  return _studySets;
};

StudySetIndexStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case IndexConstants.RECEIVE_ALL_INDEX:
    case IndexConstants.RECEIVE_SEARCH_RESULT:
    case IndexConstants.RECEIVE_STUDY_SETS:
    case KlassConstants.RECEIVE_KLASS:
    case IndexConstants.RECEIVE_BY_LANGUAGE:
      _studySets = payload.studySets;
      this.__emitChange();
      break;
  }
};

module.exports = StudySetIndexStore;
window.StudySetIndexStore = StudySetIndexStore;
