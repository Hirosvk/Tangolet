const AppDispatcher = require('../dispatcher/dispatcher');
const IndexUtils = require('../utils/index_utils');
const IndexConstants = require('../constants/index_constants');


const IndexActions = {

  fetchAllIndex(){
    IndexUtils.fetchAllIndex(this.receiveAllIndex);
  },

  receiveAllIndex(allIndex){
    AppDispatcher.dispatch({
      actionType: IndexConstants.RECEIVE_ALL_INDEX,
      languages: allIndex.languages,
      studySets: allIndex.study_sets,
      klasses: allIndex.klasses
    });
  },

  fetchMyKlasses(){
    IndexUtils.fetchMyKlasses(this.receiveMyKlasses);
  },

  receiveMyKlasses(myKlasses){
    AppDispatcher.dispatch({
      actionType: IndexConstants.RECEIVE_MY_KLASSES,
      createdKlasses: myKlasses.my_created_klasses,
      enrolledKlasses: myKlasses.my_klasses
    });
  },


  fetchMyStudySets(){
    IndexUtils.fetchMyStudySets(this.receiveStudySets);
  },

  receiveStudySets(studySets){
    AppDispatcher.dispatch({
      actionType: IndexConstants.RECEIVE_STUDY_SETS,
      studySets: studySets
    });
  },

  fillStudySetPool(option){
    if (option === "all" ){
      IndexUtils.fetchStudySets(this._fillStudySetPool);
    } else {
      IndexUtils.fetchMyStudySets(this._fillStudySetPool);
    }
  },

  _fillStudySetPool(studySets){
    AppDispatcher.dispatch({
      actionType: IndexConstants.FILL_STUDY_SET_POOL,
      studySets: studySets
    });
  },

  search(searchText){
    IndexUtils.search(searchText, this.receiveSearchResult);
  },

  receiveSearchResult(searchResult){
    AppDispatcher.dispatch({
      actionType: IndexConstants.RECEIVE_SEARCH_RESULT,
      languages: searchResult.languages,
      studySets: searchResult.study_sets,
      klasses: searchResult.klasses
    });
  },

  fetchByLanguage(id){
    IndexUtils.fetchByLanguage(id, this.receiveByLanguage);
  },

  receiveByLanguage(searchResult){
    AppDispatcher.dispatch({
      actionType: IndexConstants.RECEIVE_BY_LANGUAGE,
      studySets: searchResult.study_sets,
      klasses: searchResult.klasses
    });
  },

  fetchAllLanguages(){
    IndexUtils.fetchAllLanguages(this.receiveAllLanguages);
  },

  receiveAllLanguages(languages){
    AppDispatcher.dispatch({
      actionType: IndexConstants.RECEIVE_ALL_LANGUAGES,
      languages: languages
    });
  }

};

module.exports = IndexActions;
window.IndexActions = IndexActions;
