const AppDispatcher = require('../dispatcher/dispatcher');
const LanguageUtils = require('../utils/language_utils');
const LanguageConstants = require('../constants/language_constants');

const LanguageActions = {
  fetchAllLanguages(errorCallback){
    LanguageUtils.fetchAllLanguages(this.receiveAllLanguages, errorCallback);
  },

  receiveAllLanguages(languages){
    AppDispatcher.dispatch({
      actionType: LanguageConstants.RECEIVE_LANGUAGES,
      languages: languages
    });
  }

};

module.exports = LanguageActions;
window.LanguageActions = LanguageActions;
