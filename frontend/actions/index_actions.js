const AppDispatcher = require('../dispatcher/dispatcher');
const IndexUtils = require('../utils/index_utils');
const IndexConstants = require('../constants/index_constants');


function log(a){
  console.log(a);
}

const IndexActions = {
  getStudySetIndex(errorCallback){
    IndexUtils.getStudySetIndex(this.receiveStudySetIndex, errorCallback);
  },

  getStudySetIndexforKlass(klassId, errorCallback){
    IndexUtils.getStudySetIndexforKlass(klassId, this.receiveStudySetIndex, errorCallback);
  },

  getKlassIndex(errorCallback){
    IndexUtils.getKlassIndex(this.receiveKlassIndex, errorCallback);
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
