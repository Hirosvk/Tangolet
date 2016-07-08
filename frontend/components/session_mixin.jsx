const CurrentUserStore = require('../stores/current_user_store');
const hashHistory = require('react-router').hashHistory;

const Session = {
  currentUserListenerSetup(){
    this.userListener = CurrentUserStore.addListener(this.redirectToIndex);
  },

  currentUserListenerRemove(){
    if (this.userListener){
      this.userListener.remove();
    }
  },

  redirectToIndex(){
    if (CurrentUserStore.getCurrentUser().id === undefined) {
      hashHistory.push('/');
    }
  }
};

module.exports = Session;
