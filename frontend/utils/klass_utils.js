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

  updateStudySets(data, successCallback, errorCallback){
    $.ajax({
      url: `api/klasses/${data.id}/update_study_sets`,
      type: "PATCH",
      data: {
        klass: {
          study_set_ids: data.studySetIds
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
  },

  toggleEnrollment(klassId, successCallback, errorCallback){
    $.ajax({
      url: `api/user/enroll`,
      type: "PATCH",
      data:{
        user: {
          klass_id: klassId
        }
      },
      success: successCallback,
      error: errorCallback
    });
  }

};
