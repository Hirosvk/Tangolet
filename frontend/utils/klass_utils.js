module.exports = {
  fetchKlass(id, successCallback, errorCallback){
    $.ajax({
      url: `api/klasses/${id}`,
      type: "GET",
      success: successCallback,
      error: errorCallback
    });
  },

  createKlass(data, successCallback, errorCallback){
    $.ajax({
      url: "api/klasses/",
      type: "POST",
      data: {
        klass: data
      },
      success: successCallback,
      error: errorCallback
    });
  },

  editKlass(data, successCallback, errorCallback){
    $.ajax({
      url: `api/klasses/${data.id}`,
      type: "PATCH",
      data: {
        klass: {
          name: data.name,
          description: data.description,
          language_id: data.language_id
        }
      },
      success: successCallback,
      error: errorCallback
    });
  },

  deleteKlass(id, successCallback, errorCallback){
    $.ajax({
      url: `api/klasses/${id}`,
      type: "DELETE",
      success: successCallback,
      error: errorCallback
    });
  }

};
