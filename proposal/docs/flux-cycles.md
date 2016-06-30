# Stores

* KlassStore (<- klasses#show)
  * React Comp: Klass
  * id, name, description, language(id, name), created_at, study_set_ids, updated_at

* StudySetStore (<- StudySets#show)
  * React Comp: StudySet -> StudySetList
  * id, name, creator(id, name), words(word_english, word_foreign), created_at, updated_at, klass_ids

* IndexStore
  * Index -> StudySetIndex & KlassIndex
  * studySets <- study_sets#index w/query 'class=:id'
    * id, name, creator, language(id, name)
  * klasses <- klasses#index
    * id, name, teacher, language(id, name)


* LanguageStore

* ErrorStore

* CurrentUserStore (<- User#show)
  * id, name

* ProgressByStudySetStore
* ProgressByStudentStore
* SearchResultStore
* NavbarStore
* TestScoreStore


# Actions

* SessionAction
  * signup
  * login
  * logout
  * receiveCurrentUser
  * passError

* UserAction
 * fetchNavbarRecords
 * receiveNavbarRecords
 * fetchTestScore
 * receiveTestScore

* ClassAction
  * fetchSingleClass
    * receiveSingleClass
  * fetchStudySets
    * receiveStudySets
  * fetchProgressByStudySet
    * receiveProgresByStudySet
  * fetchProgressByStudent
    * receiveProgressByStudent
  * deleteEnrollment
    - [ ] calls UserAction.fetchNavbarRecords
    - [ ] calls fetchSingleClass --> this will cause the Class component to re-render with the upated enrollment info.
  * createEnrollment
    - [ ] calls UserAction.fetchNavbarRecords
    - [ ] calls fetchSingleClass --> this will cause the Class component to re-render with the upated enrollment info.  
  * createNewClass
    - [ ] calls UserAction.fetchNavbarRecords
  * deleteClass
    - [ ] calls UserAction.fetchNavbarRecords

* StudySetAction
  * fetchStudySet
    * receiveStudySet
  * createNewStudySet
    - [ ] calls fetchStudySet
    - [ ] calls UserAction.fetchNavbarRecords
  * deleteStudySet
    - [ ] takes callback from StudySetAction view
    - [ ] calls UserAction.fetchNavbarRecords

* TestAction
  * submitTest
    - [ ] pass callback from View, which display the status of the request
    - [ ] no receive action

* SearchAction
  * querySearchText
    * receiveSearchResults


# Flux Cycles
* **This section is incomplete**
* see also [component_details]
[component_details]: component_details.md

## Search Cycle
  * user enter search text and submit
  * SearchAction.querySearchText
  * SearchAction.receiveSearchResult
  * SearchResultStore receive the new data
  * SearchResults receive the new data, pass it to SearchResultItem

## Navbar Cycle
  * Navbar mounts
  * UserAction.fetchNavbarRecords
  * UserAction.receiveNavbarRecords
  * NavbarStore receives new data
  * Navbar view setState with new data

  * when user create/edit study sets or classes, or enroll in new class, it calls UserAction.fetchNavbarRecords


## StudySetForm Cycle
  * StudySetAction.createNewStudySet
  * on success
    * UserAction.fetchNavbarRecord --> see Navbar Cycle
    * invoke callback from StudySetForm: redirect to the Study Set page
  * on error
    * user receive error messages
    * user stays on the same page



## ClassForm Cycle
  * ClassAction.createNewClass
  * on success
    * UserAction.fetchNavbarRecord --> see Navbar Cycle
    * invoke callback from ClassForm: redirect to the Study Set page
  * on error
    * user receive error messages
    * user stays on the same page


## DeleteClass Cycle

## DeleteStudySet Cycle
### StudySet
  * same flow as DeleteClass


## StudySet Cycle
  * StudySet mounts
  * StudySetAction.fetchStudySets
  * StudySetStore receives data
  * StudySet receives the new data




## Test Submission Cycle
  * Test submit
    * Test.gradeTest
      * Test.showScore
      * TestAction.submitTest (no Dispatcher action)
        * callback: alert the request status

## Class Cycle


## ClassStudyIndex Cycle
  * ClassStudySetIndex mounts
  * ClassAction.fetchStudySets
  * ClassAction.receiveStudySets
  * ClassStudySetStore receives data
  * StudySetIndex reset its state


## TestScore Cycle
