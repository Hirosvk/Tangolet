const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const LanguageConstants = require('../constants/language_constants');

const LanguageStore = new Store(AppDispatcher);

  let languages = [];

LanguageStore.all = function(){
  return languages;
};


LanguageStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case LanguageConstants.RECEIVE_LANGUAGES:
      languages = payload.languages;
      this.__emitChange();
      break;
  }
};

module.exports = LanguageStore;
window.LanguageStore = LanguageStore;
