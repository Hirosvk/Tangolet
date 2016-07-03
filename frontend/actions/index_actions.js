const AppDispatcher = require('../dispatcher/dispatcher');
const IndexUtils = require('../utils/index_utils');
const IndexConstants = require('../constants/index_constants');


const IndexActions = {
  getStudySetIndex(errorCallback){
    IndexUtils.getStudySetIndex(this.receiveStudySetIndex, errorCallback);
  },

  getKlassIndex(errorCallback){
    IndexUtils.getKlassIndex(this.receiveKlassIndex, errorCallback);
  },

  getMyKlassIndex(errorCallback){
    IndexUtils.getMyKlassIndex(this.receiveKlassIndex, errorCallback);
  },

  getMyKlassCreatedIndex(errorCallback){
    IndexUtils.getMyKlassCreatedIndex(this.receiveKlassIndex, errorCallback);
  },

  getMyStudySetIndex(errorCallback){
    IndexUtils.getMyStudySetIndex(this.receiveStudySetIndex, errorCallback);
  },

  receiveStudySetIndex(studySets){
    AppDispatcher.dispatch({
      actionType: IndexConstants.RECEIVE_STUDY_SET_INDEX,
      studySets: studySets
    });
  },

  receiveKlassIndex(klasses){
    AppDispatcher.dispatch({
      actionType: IndexConstants.RECEIVE_KLASS_INDEX,
      klasses: klasses
    });
  }

};

module.exports = IndexActions;
window.IndexActions = IndexActions;
