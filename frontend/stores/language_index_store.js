const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const IndexConstants = require('../constants/index_constants');

const LanguageIndexStore = new Store(AppDispatcher);

let _languages = [];

LanguageIndexStore.getLanguages = function(){
  return _languages;
};


LanguageIndexStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case IndexConstants.RECEIVE_ALL_INDEX:
    case IndexConstants.RECEIVE_SEARCH_RESULT:
      _languages = payload.languages;
      this.__emitChange();
      break;
  }
};

module.exports = LanguageIndexStore;
window.LanguageIndexStore = LanguageIndexStore;
