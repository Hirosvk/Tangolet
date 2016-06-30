const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const KlassConstants = require('../constants/klass_constants');

const KlassStore = new Store(AppDispatcher);

let _klass = {
          teacher: {},
          language:{},
          study_set_ids: []
        };
// properties are pre-defined here, so that the view files
// don't throw errors with undefined objects.

KlassStore.getKlass = function(){
  return _klass;
};

KlassStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case KlassConstants.RECEIVE_KLASS:
      _klass = payload.klass;
      _klass.description = _klass.description || "";
      this.__emitChange();
      break;
  }
};

module.exports = KlassStore;
window.KlassStore = KlassStore;
