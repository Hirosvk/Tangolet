const AppDispatcher = require('../dispatcher/dispatcher');
const KlassConstants = require('../constants/klass_constants');
const KlassUtils = require('../utils/klass_utils');
const ErrorActions = require('./error_actions');

const KlassActions = {
  fetchKlass(id, errorCallback){
    KlassUtils.fetchKlass(id, this.receiveKlass, errorCallback);
  },

  receiveKlass(klass){
    AppDispatcher.dispatch({
      actionType: KlassConstants.RECEIVE_KLASS,
      klass: klass
    });
  },

  createKlass(klassData){
    KlassUtils.createKlass(klassData, this.receiveKlass, ErrorActions.updateError);
  },

  editKlass(klassData){
    KlassUtils.editKlass(klassData, this.receiveKlass, ErrorActions.updateError);
  },

  deleteKlass(id, successCallback){
    KlassUtils.deleteKlass(id, successCallback, ErrorActions.updateError);
  }

};

module.exports = KlassActions;
window.KlassActions = KlassActions;
