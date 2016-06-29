module.exports = {
  fetchStudySet(id, successCallback, errorCallback){
    $.ajax({
      url: `api/study_sets/${id}`,
      type: "GET",
      success: successCallback,
      error: errorCallback
    });
  },

};
