const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const SessionConstants = require('../constants/session_constants');

const CurrentUserStore = new Store(AppDispatcher);

let _currentUser = {
  klass_ids: []
};

CurrentUserStore.getCurrentUser = function(){
  return _currentUser;
};

CurrentUserStore.klassIds = function(){
  return _currentUser.klass_ids;
};

CurrentUserStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case SessionConstants.LOGIN_USER:
      _currentUser = payload.user;
      if (!payload.user.klass_ids) {
        _currentUser.klass_ids = [];
      }
      this.__emitChange();
      break;
  }
};

module.exports = CurrentUserStore;
window.CurrentUserStore = CurrentUserStore;
