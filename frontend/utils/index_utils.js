module.exports = {
  fetchAllIndex(successCallback, errorCallback){
    $.ajax({
      url: 'api/index_all',
      type: "GET",
      success: successCallback,
      error: errorCallback
    });
  },

  fetchMyKlasses(successCallback, errorCallback){
    $.ajax({
      url: 'api/user/my_klasses',
      type: "GET",
      success: successCallback,
      error: errorCallback
    });
  },


  fetchMyStudySets(successCallback, errorCallback){
    $.ajax({
      url: `api/user/my_study_sets`,
      type: "GET",
      success: successCallback,
      error: errorCallback
    });
  },

  fetchStudySets(successCallback, errorCallback){
    $.ajax({
      url: `api/study_sets`,
      type: "GET",
      success: successCallback,
      error: errorCallback
    });
  },

  fetchByLanguage(id, successCallback, errorCallback){
    $.ajax({
      url: `api/languages/${id}`,
      type: "GET",
      success: successCallback,
      error: errorCallback
    });
  },

  fetchAllLanguages(successCallback, errorCallback){
    $.ajax({
      url: `api/languages/`,
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
