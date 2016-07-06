const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const IndexConstants = require('../constants/index_constants');

const KlassIndexStore = new Store(AppDispatcher);

let _klassIndices = {
  allKlasses: [],
  createdKlasses: [],
  enrolledKlasses: []
};

KlassIndexStore.getKlasses = function(option){
  if (option === "createdKlasses" || option === "enrolledKlasses"){
    return _klassIndices[option];
  } else {
    return _klassIndices["allKlasses"];
  }
};

KlassIndexStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case IndexConstants.RECEIVE_ALL_INDEX:
    case IndexConstants.RECEIVE_SEARCH_RESULT:
    case IndexConstants.RECEIVE_BY_LANGUAGE:
      _klassIndices.allKlasses = payload.klasses;
      this.__emitChange();
      break;
    case IndexConstants.RECEIVE_MY_KLASSES:
      _klassIndices.createdKlasses = payload.createdKlasses;
      _klassIndices.enrolledKlasses = payload.enrolledKlasses;
      this.__emitChange();
      break;

  }
};

module.exports = KlassIndexStore;
window.KlassIndexStore = KlassIndexStore;
