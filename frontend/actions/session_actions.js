const AppDispatcher = require('../dispatcher/dispatcher');
const SessionUtils = require('../utils/session_utils');
const SessionConstants = require('../constants/session_constants');
const ErrorActions = require('./error_actions');

module.exports = {
  login(credentials){
    SessionUtils.login(credentials, this.receiveUser, ErrorActions.updateError);
  },

  logout(){
    SessionUtils.logout(this.receiveUser, ErrorActions.updateError);
  },

  signup(userInfo){
    SessionUtils.signup(userInfo, this.receiveUser, ErrorActions.updateError);
  },

  receiveUser(currentUser){
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGIN_USER,
      user: currentUser
    });
  },

};
