module.exports = {
  getStudySetIndex(successCallback, errorCallback){
    $.ajax({
      url: `api/study_sets/`,
      type: "GET",
      success: successCallback,
      error: errorCallback
    });
  },

  getStudySetIndexforKlass(klassId, successCallback, errorCallback){
    $.ajax({
      url: `api/study_sets?class=${klassId}`,
      type: "GET",
      success: successCallback,
      error: errorCallback
    });
  },

  getKlassIndex(successCallback, errorCallback){
    $.ajax({
      url: "api/klasses/",
      type: "GEt",
      success: successCallback,
      error: errorCallback
    });
  }

};
