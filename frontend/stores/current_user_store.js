const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const SessionConstants = require('../constants/session_constants');

const CurrentUserStore = new Store(AppDispatcher);

let _currentUser = {};

CurrentUserStore.getCurrentUser = function(){
  return _currentUser;
};

CurrentUserStore.klassIds = function(){
  return _currentUser.klass_ids;
  // if (_currentUser.klasses){
  //   return _currentUser.klasses.map(klass => klass.id);
  // }
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
