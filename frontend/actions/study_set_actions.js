const AppDispatcher = require('../dispatcher/dispatcher');
const StudySetConstants = require('../constants/study_set_constants');
const StudySetUtils = require('../utils/study_set_utils');
const ErrorActions = require('./error_actions');

const StudySetActions = {
  fetchStudySet(id, errorCallback){
    StudySetUtils.fetchStudySet(id, this.receiveStudySet, errorCallback);
  },

  receiveStudySet(studySet){
    AppDispatcher.dispatch({
      actionType: StudySetConstants.RECEIVE_STUDY_SET,
      studySet: studySet
    });
  },

  createStudySet(studySetData){
    StudySetUtils.createStudySet(studySetData, this.receiveStudySet, ErrorActions.updateError);
  },

  editStudySet(studySetData){
    StudySetUtils.editStudySet(studySetData, this.receiveStudySet, ErrorActions.updateError);
  },

  deleteStudySet(id, successCallback){
    StudySetUtils.deleteStudySet(id, successCallback, ErrorActions.updateError);
  },

  submitTest(testData, successCallback){
    StudySetUtils.submitTest(testData, successCallback, ErrorActions.updateError);
    // no action required for successful submission.
  }

};

module.exports = StudySetActions;
window.StudySetActions = StudySetActions;
