module.exports = {
  fetchAllLanguages(successCallback, errorCallback){
    $.ajax({
      url: `api/languages/`,
      type: "GET",
      success: successCallback,
      error: errorCallback
    });
  }
};
