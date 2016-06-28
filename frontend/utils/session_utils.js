module.exports = {
  login(credentials, successCallback, errorCallback){
    $.ajax({
      url: "api/session",
      type: "POST",
      data: {
        user: credentials
      },
      success: successCallback,
      error: errorCallback
    });
  },

  logout(successCallback, errorCallback){
    $.ajax({
      url: "api/session",
      type: "DELETE",
      success: successCallback,
      error: errorCallback
    });
  },

  signup(userInfo, successCallback, errorCallback){
    $.ajax({
      url: "api/user",
      type: "POST",
      data: {
        user: userInfo
      },
      success: successCallback,
      error: errorCallback
    });
  },
};
