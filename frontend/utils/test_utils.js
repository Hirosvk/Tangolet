const TestScoreUtils = {
  fetchScoresCurrentUser(successCallback, errorCallback){
    $.ajax({
      url: `api/tests`,
      type: "GET",
      success: successCallback,
      error: errorCallback
    });
  },

  fetchScoresByStudySets(data, successCallback, errorCallback){
    const klass_id = data.klassId;
    const study_set_id = data.studySetId;
    $.ajax({
      url: `api/tests?klass_id=${klass_id}&study_set_id=${study_set_id}`,
      type: "GET",
      success: successCallback,
      error: errorCallback
    });
  },

  fetchScoresByStudents(data, successCallback, errorCallback){
    const klass_id = data.klassId;
    const user_id = data.studentId;
    $.ajax({
      url: `api/tests?klass_id=${klass_id}&user_id=${user_id}`,
      type: "GET",
      success: successCallback,
      error: errorCallback
    });
  },

  fetchCollectionByStudents(klassId, successCallback, errorCallback){
    $.ajax({
      url: `api/tests/collection?klass_id=${klassId}&option=by_students`,
      type: "GET",
      success: successCallback,
      error: errorCallback
    });
  },

  fetchCollectionByStudySets(klassId, successCallback, errorCallback){
    $.ajax({
      url: `api/tests/collection?klass_id=${klassId}&option=by_study_sets`,
      type: "GET",
      success: successCallback,
      error: errorCallback
    });
  }

};

module.exports = TestScoreUtils;
window.TestScoreUtils = TestScoreUtils;
