const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const IndexConstants = require('../constants/index_constants');

const IndexStore = new Store(AppDispatcher);

let indices = {
              studySets: [],
              allKlasses: [],
              createdKlasses: [],
              enrolledKlasses: []
            };

IndexStore.getStudySets = function(){
  return indices.studySets;
};

IndexStore.getKlasses = function(option){
  if (!option) { option = "allKlasses"; }
  return indices[option];
};

IndexStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case IndexConstants.RECEIVE_STUDY_SET_INDEX:
      indices.studySets = payload.studySets;
      this.__emitChange();
      break;
    case IndexConstants.RECEIVE_ALL_KLASS_INDEX:
      indices.allKlasses = payload.klasses;
      this.__emitChange();
      break;
    case IndexConstants.RECEIVE_CREATED_KLASS_INDEX:
      indices.createdKlasses = payload.klasses;
      this.__emitChange();
      break;
    case IndexConstants.RECEIVE_ENROLLED_KLASS_INDEX:
      indices.enrolledKlasses = payload.klasses;
      this.__emitChange();
      break;

  }
};

module.exports = IndexStore;
window.IndexStore = IndexStore;
