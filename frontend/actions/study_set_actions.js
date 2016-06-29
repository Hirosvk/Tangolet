const AppDispatcher = require('../dispatcher/dispatcher');
const StudySetConstants = require('../constants/study_set_constants');
const StudySetUtils = require('../utils/study_set_utils');

const StudySetActions = {
  fetchStudySet(id, errorCallback){
    StudySetUtils.fetchStudySet(id, this.receiveStudySet, errorCallback)
  },

  receiveStudySet(studySet){
    AppDispatcher.dispatch({
      actionType: StudySetConstants.RECEIVE_STUDY_SET,
      studySet: studySet
    })
  }

};

module.exports = StudySetActions;
window.StudySetActions = StudySetActions;
