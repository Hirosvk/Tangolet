const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const IndexConstants = require('../constants/index_constants');

const IndexStore = new Store(AppDispatcher);

let indices = {
              studySets: [],
              klasses: []
            };

IndexStore.getStudySets = function(){
  return indices.studySets;
};

IndexStore.getKlasses = function(){
  return indices.klasses;
};


IndexStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case IndexConstants.RECEIVE_STUDY_SET_INDEX:
      indices.studySets = payload.studySets;
      this.__emitChange();
      break;
    case IndexConstants.RECEIVE_KLASS_INDEX:
      indices.klasses = payload.klasses;
      this.__emitChange();
      break;

  }
};

module.exports = IndexStore;
window.IndexStore = IndexStore;
