const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const SessionConstants = require('../constants/session_constants');

const ErrorStore = new Store(AppDispatcher);

let _errors = {};

ErrorStore.full_errors = function(){
  return _errors;
};

ErrorStore.resetErrors = function(){
  _errors = {};
},



ErrorStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case SessionConstants.RECEIVE_ERROR:
      _errors = payload.error;
      this.__emitChange();
      break;
  }
};

module.exports = ErrorStore;
window.ErrorStore = ErrorStore;
