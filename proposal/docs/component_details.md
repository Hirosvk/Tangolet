
## LoginForm
* addEventListner onSubmit
  * SessionAction.login
* addListener to CurrentUserStore
  * redirect to root on successful login
  * fetch error messages from ErrorStore on failure
* componentWillUnmount

## SignupForm
* addEventListner onSubmit
  * SessionAction.login
* addListener to CurrentUserStore
  * redirect to root on successful login
  * fetch error messages from ErrorStore on failure
* componentWillUnmount


## Header
* state: currentUser
* addListener on currentUserStore
  * setState with the new status --> render
* render
  * if currentUser exists
    * display username & logout button
  * else
    * login & signup button
  * add event listener to the buttons
    * redirect to respective pages & request


## Search
* state: searchText
* add event listener onChange
  * setState to the new text
* add event listener onSubmit
  * change hashHistory with the query text

### SearchResults
* state: searchResultStore.all()
* componentDidMount:
  * SearchAction.querySearchText with params
  * add listener to SearchResultStore
    * callback: setState with new SearchResults
* pass each result item as prop to SearchResultItem
* componentWillUnmount

### SearchResultItem
* props: result item
* render link to class/study Set


## Content
* state: currentUser
* if currentUser is true, render Navbar

## Navbar
  * state:
    * userRecords: NavbarStore.all()
  * componentDidMount:
    * call UserAtion.fetchNavbarRecords
    * addListener to NavbarStore
      * setState to the new data
  * pass state to its children as props
  * componentWillUnmount

### MyCreatedClassesIndex
  * prop: classes_enrolled
  * receiveNewProps:
    * set new props as instance variable
  * render links to the classes

### MyCreatedClassesIndex
  * prop: classes_created
  * receiveNewProps:
    * set new props as instance variable
  * render links to the classes

### MyStudySetIndex
  * prop: study sets_created
  * receiveNewProps:
    * set new props as instance variable
  * render links to the study sets

## TestScores
  * state: TestScoreStore.all()
  * componentDidMount:
    * UserActon.fetchTestScores
    * addListener to TestScoreStore
      * callback: setState with new TestScoreStore.all()
  * pass each test score item as props to TestScoreItem
  * componentWillUnmount

### TestScoreItem
  * props: test score item
  * render test score and link to the study Set



## StudySetForm
  * state:
    * form content
  * add event listener onChange
    * setState to the new values <-- not sure if it's necessary
  * add event listener onSubmit
    * preventDefault
    * StudySetAction.createNewStudySet
      * successCallback: redirect to the new Study Set
      * errorCalback: display error message
  * render, pass a function to ClassOptionBox
    * this function update state.class_ids
## ClassOptionBox
  * props: callback function from StudySetForm
  * in render function, get MyCreatedClasses from NavbarStore
  * add event listener: onChange, invoke the function passed from StudySetForm as prop
  * render checkbox to choose what class the Study Set is added to


## ClassForm
  * state: form content
  * add event listener onSubmit
    * preventDefault
    * ClassAction.createNewClass
      * successCallback: redirect to the new Class
      * errorCalback: display error message
  * add event listener onChange
    * setState to the new values


## StudySet
  * state:
    * Study Set info
    * words
  * componentDidMount:
    * StudySetAction.fetchStudySet
    * Add Lister to StudySetStore
      * setState
  * add event listener to delete button
    * callback: StudySetAction.deleteStudySet
      * on success: redirect to Index
  * pass state.words to children as props
  * componentWillUnmount

### List
  * props: words
  * render list

### Test
  * props: words
  * componentWillMount:
    * confirm that props are not empty
    * generate questions based on props
  * pass questions as props

#### TestForm
  * props: questions
  * state: form content
  * add event listener onChange
    * setState with new values
  * add event listener to test form on submit
    * gradeTest
      * TestAction.submitTest (if currentUser is true)
        * callback: alert submission status

## Class Cycle
  * state: ClassStore
  * componentDidMount:
    * ClassAction.fetchSingleClass
    * Add Listener to ClassStore
      * setState to the new data
  * add event listener to delete button
    * callback: ClassAction.deleteClass
      * on success: redirect to Index
  * add event listener on enrollment button
    * callback: toggleEnrollment
      * current_user is enrolled in class --> ClassAction.deleteEnrollment
      * current_user is not enrolled in class --> ClassAction.createEnrollment
  * componentWillUnmount

### StudySetIndex
  * componentDidMount:
    * add listener to ClassStudyStore
      * setState
    * ClassAction.fetchStudySets
  * pass study sets as props to StudySetIndexItem
  * componentWillUnmount

#### StudySetIndexItem
  * props: StudySet item
  * render link to the Study Set


### ProgressByStudySet
  * same flow as ClassStudySet

### ProgressByStudent
  * same flow as ClassStudySet


**make sure to display error messages on GET requests**
