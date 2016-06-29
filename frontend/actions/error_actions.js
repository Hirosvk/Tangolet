const AppDispatcher = require('../dispatcher/dispatcher');
const ErrorConstants = require('../constants/session_constants');

module.exports = {
  updateError(error){
    AppDispatcher.dispatch({
      actionType: ErrorConstants.RECEIVE_ERROR,
      error: error
    });
  }
};
