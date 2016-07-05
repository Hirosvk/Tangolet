const AppDispatcher = require('../dispatcher/dispatcher');
const IndexUtils = require('../utils/index_utils');
const IndexConstants = require('../constants/index_constants');


const IndexActions = {
  getStudySetIndex(errorCallback){
    IndexUtils.getStudySetIndex(this.receiveStudySetIndex, errorCallback);
  },

  getKlassIndex(errorCallback){
    IndexUtils.getKlassIndex(this.receiveKlassIndex.bind(null, IndexConstants.RECEIVE_ALL_KLASS_INDEX)
    , errorCallback);
  },

  getMyKlassIndex(errorCallback){
    IndexUtils.getMyKlassIndex(this.receiveKlassIndex.bind(null, IndexConstants.RECEIVE_ENROLLED_KLASS_INDEX), errorCallback);
  },

  getMyKlassCreatedIndex(errorCallback){
    IndexUtils.getMyKlassCreatedIndex(this.receiveKlassIndex.bind(null, IndexConstants.RECEIVE_CREATED_KLASS_INDEX), errorCallback);
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

  receiveKlassIndex(receiveOption, klasses){
    AppDispatcher.dispatch({
      actionType: receiveOption,
      klasses: klasses
    });
  }

};

module.exports = IndexActions;
window.IndexActions = IndexActions;
