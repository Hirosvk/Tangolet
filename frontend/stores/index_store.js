const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const IndexConstants = require('../constants/index_constants');

const IndexStore = new Store(AppDispatcher);

let indices = {
              studySets: [],
              allKlasses: [],
              createdKlasses: [],
              enrolledKlasses: [],
              languages: []
            };

IndexStore.getWholeObject = function(){
  return indices;
};

IndexStore.getStudySets = function(){
  return indices.studySets;
};

IndexStore.getLanguages = function(){
  return indices.languages;
};

IndexStore.getKlasses = function(option){
  if (option === "createdKlasses" || option === "enrolledKlasses"){
    return indices[option];
  } else {
    return indices["allKlasses"];
  }
};

IndexStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case IndexConstants.RECEIVE_STUDY_SET_INDEX:
      indices.studySets = payload.studySets || [];
      this.__emitChange();
      break;
    case IndexConstants.RECEIVE_ALL_KLASS_INDEX:
      indices.allKlasses = payload.klasses || [];
      this.__emitChange();
      break;
    case IndexConstants.RECEIVE_CREATED_KLASS_INDEX:
      indices.createdKlasses = payload.klasses || [];
      this.__emitChange();
      break;
    case IndexConstants.RECEIVE_ENROLLED_KLASS_INDEX:
      indices.enrolledKlasses = payload.klasses || [];
      this.__emitChange();
      break;
    case IndexConstants.RECEIVE_LANGUAGE_INDEX:
      indices.languages = payload.languages || [];
      this.__emitChange();
      break;
    case IndexConstants.RECEIVE_SEARCH_RESULT:
      indices.allKlasses = payload.searchResult.klasses || [];
      indices.studySets = payload.searchResult.study_sets || [];
      indices.languages = payload.searchResult.languages || [];
      this.__emitChange();
      break;
  }
};

module.exports = IndexStore;
window.IndexStore = IndexStore;
