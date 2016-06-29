module.exports = {
  fetchStudySet(id, successCallback, errorCallback){
    $.ajax({
      url: `api/study_sets/${id}`,
      type: "GET",
      success: successCallback,
      error: errorCallback
    });
  },

  createStudySet(data, successCallback, errorCallback){
    $.ajax({
      url: "api/study_sets/",
      type: "POST",
      data: {
        study_set: data.studySet,
        words: data.words
      },
      success: successCallback,
      error: errorCallback
    });
  },

  editStudySet(data, successCallback, errorCallback){
    $.ajax({
      url: `api/study_sets/${data.studySet.id}`,
      type: "PATCH",
      data: {
        study_set: data.studySet,
        words: data.words
      },
      success: successCallback,
      error: errorCallback
    });
  },

  deleteStudySet(id, successCallback, errorCallback){
    $.ajax({
      url: `api/study_sets/${id}`,
      type: "DELETE",
      success: successCallback,
      error: errorCallback
    });
  }

};
