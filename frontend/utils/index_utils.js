module.exports = {
  getStudySetIndex(successCallback, errorCallback){
    $.ajax({
      url: `api/study_sets`,
      type: "GET",
      success: successCallback,
      error: errorCallback
    });
  },

  getLanguageIndex(successCallback, errorCallback){
    $.ajax({
      url: `api/languages`,
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
      url: "api/klasses",
      type: "GEt",
      success: successCallback,
      error: errorCallback
    });
  },

  getMyStudySetIndex(successCallback, errorCallback){
    $.ajax({
      url: `api/user/my_study_sets`,
      type: "GET",
      success: successCallback,
      error: errorCallback
    });
  },

  getMyKlassIndex(successCallback, errorCallback){
    $.ajax({
      url: `api/user/my_klasses`,
      type: "GET",
      success: successCallback,
      error: errorCallback
    });
  },

  getMyKlassCreatedIndex(successCallback, errorCallback){
    $.ajax({
      url: `api/user/my_klasses_created`,
      type: "GET",
      success: successCallback,
      error: errorCallback
    });
  },

  search(searchText, successCallback, errorCallback){
    $.ajax({
      url: `api/search?search=${searchText}`,
      type: "GET",
      success: successCallback,
      error: errorCallback
    });
  }

};
