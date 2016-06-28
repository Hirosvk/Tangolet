const AppDispatcher = require('../dispatcher/dispatcher');
const SessionUtils = require('../utils/session_utils');
const SessionConstants = require('../constants/session_constants');

module.exports = {
  login(credentials){
    SessionUtils.login(credentials, this.receiveUser, this.updateError);
  },

  logout(){
    SessionUtils.logout(this.receiveUser, this.updateError);
  },

  signup(userInfo){
    SessionUtils.signup(userInfo, this.receiveUser, this.updateError);
  },

  receiveUser(currentUser){
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGIN_USER,
      user: currentUser
    });
  },

  updateError(error){
    AppDispatcher.dispatch({
      actionType: SessionConstants.RECEIVE_ERROR,
      error: error
    });
  }
};
