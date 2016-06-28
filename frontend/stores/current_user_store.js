const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const SessionConstants = require('../constants/session_constants');

const CurrentUserStore = new Store(AppDispatcher);

let _currentUser = {};

CurrentUserStore.getCurrentUser = function(){
  return _currentUser;
};

CurrentUserStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case SessionConstants.LOGIN_USER:
      _currentUser = payload.user;
      this.__emitChange();
      break;
  }
};

module.exports = CurrentUserStore;
window.CurrentUserStore = CurrentUserStore;
