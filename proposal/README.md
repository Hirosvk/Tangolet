# Tangolet

  [Heroku Link][heroku_link]
[heroku_link]: http://tangolet.heroku.com

# Minimum Viable Product
Tangolet is a web application inspired by Quizlet, a popular classroom tool for foreign language studies. On Tangolet students can memorize new vocabularies in interactive ways, and teachers can manage their classes. The app will be built using Ruby on Rails and React.js.

- [ ] Hosting on Heroku
- [ ] New account creation, log-in, and guest log-in
- [ ] Production README.md

- [ ] Study Sets (vocabulary lists)
  - [ ] Users can create, and delete study sets
  - [ ] Users can search for Study Sets created by other Users
  - [ ] Each Study Set includes the following features:
    - [ ] List
      - [ ] display the list of all vocabulary pair
    - [ ] Test
      - [ ] Test is randomly generated based on the Study Set
      - [ ] When User submits Test, the score is recorded in DB
      - [ ] Users can see their past Test scores


- [ ] Classes
  - [ ] Users can create and delete classes as Teacher
  - [ ] Users can search for Classes
  - [ ] Only Teacher can add Study Sets to the Class
  - [ ] Teachers can see Student's Test scores.

- [ ] Users
  - [ ] When logged-in, users see in Navbar:
    - [ ] Classes they created and/or enrolled
    - [ ] Study Sets they created
    - [ ] Study Sets they previously studied
  - [ ] When logged-out, users can:
    - [ ] not have access to following pages
      - [ ] Navbar
      - [ ] StudySetForm
      - [ ] ClassForm
      - [ ] MyTestScore
    - [ ] not enroll in Classes (no enroll button)
    - [ ] not save their Test scores or study history


- [ ] Styling and Navigation
  - [ ] Adequate Styling that resembles Quizlet
  - [ ] Smooth, bug-free navigation
    - [ ] Users are informed when they navigate to invalid or deleted Study Set or Class
    - [ ] Users are informed when their navigation is unauthorized
  - [ ] Adequate and appropriate seeds to demonstrate the feature


- [ ] **Bonus**
  - [ ] Users can edit their classes
  - [ ] Users can edit their study sets
  - [ ] Flashcard feature for Study Sets
  - [ ] Add language tags to Study Sets and Class belong
    - [ ] users can choose one language to tag the study set/class when creating/editing
  - [ ] App tracks which Study Sets the user has studied
    - [ ] logged-in users can see Recently Studied Sets

- [ ] **Super Bonus**
  - [ ] Users can customizable Test

  - [ ] Recent Activities page

  - [ ] Add more features to Study Sets
    - [ ] Users set their study sets as private
    - [ ] Study Set can handle non-Latin characters
    - [ ] Users can upload pictures that accompany words
    - [ ] Users can record correct pronunciation

  - [ ] Enrollment Request and Approval
    - [ ] Users request to enroll in Class as Students, and Teacher approves the request.
    - [ ] Show pending enroll request on Navbar (if the User is Teacher)

  - [ ] Game feature for study sets
    - [ ] Interactive JavaScript game
    - [ ] When logged in, Users can share their score
    - [ ] Show highest scores

  - [ ] User Profile Page
    - [ ] Users have profile page
    - [ ] Users can add their info and share on their profile page
    - [ ] Users select profile pictures





# Design Docs
  * [View Wireframes][views]
  * [React Components][components]
  * [Component Details][component_details]
  * [Flux Cycles][flux-cycles]
  * [API endpoints][api-endpoints]
  * [DB SChema][schema]

[views]: docs/views.md
[components]: docs/components.md
[component_details]: docs/component_details.md
[flux-cycles]: docs/flux-cycles.md
[api-endpoints]: docs/api-endpoints.md
[schema]: docs/schema.md

# Implementation Timeline

## Phase 1: Backend Setup and Frontend User Authentication (1.5day, W8D2)
- [x] npm, webpack, bundlers, .gitignore setup
- [x] user model
- [x] session controller
- [x] user controller
- [x] authentication
- [x] sign-up/log-in pages
- [x] static pages
- [x] basic header
- [x] SessionAction Cycle

## Phase 2: Basic Models: study_sets & study_set_word (1day, W8D4)
- [x] heroku setup

- [x] study_set model
- [x] study_set_word model
- [x] validations
- [x] setup JSON API for study_set
- [x] study_set#create
- [x] study_set#delete
- [x] study_set#show

## Phase 3: Basic React/Flux components (1.5day, W8D5)
- [x] StudySet & StudySetList React component
- [x] Basic Router setup
- [x] API Util: ajax GET, POST, DELETE request
- [x] StudySetAction
- [x] Dispatcher
- [x] StudySetStore

- [x] StudySetForm component

- [x] Basic CSS Styling


## Phase 4: Add Class feature (2day, W8D7)
- [x] build models: klasses
  - [x] controllers: create, delete, update, show
- [x] class forms: new & update
  - [x] ClassAction
  - [x] ClassStore
  - [x] ClassStudySetStore


## Phase 5: User/StudySet/Klass Associations(1day)
- [x] language
  - [x] languages models
  - [x] add language drop down to class/study_set form & actions
  - [x] add language to class/study_set show


- [x] Index
  - [x] StudySetIndex -- show all studysets
  - [x] KlassIndex -- show all klasses

- [x] klass-set associations
  - [x] rails backend
  - [x] Api endpoint at KlassController using study_set_ids
  - [x] add StudySet to class Form
  - [x] able to filter with study_sets#all with a query
  - [x] add-study-sets-to-class form


- [x] enrollment
  - [x] model & migration
  - [x] API endpoints & server routes
  - [x] toggle button on Class page


## Phase 6: Styling (1day w9d2)
- [x] CSS Styling
- [x] React Bootstraps
- [x] blank Navbar

## Phase 7: Navbar (1day w9d1)
- [x] backend setup
  - [x] user.klasses_created, user.klasses, user.study_sets
  - [x] API endpoints and server router setup

- [x] getMyKlassIndex, getMyStudySetIndex, getMyKlassCreatedIndex made and tested in IndexActions and IndexUtils

- [x] style Klass form
- [x] sign-up/log-in page overlay
- [x] side bar

## Phase 8: add Test feature (2day w9d3)
- [x] test_record model
- [x] Test React component
- [x] submit test api

- [x] back-end api for fetching test scores by users and klasses

- [x] TestIndex/TestIndexItem/TestCollection component
- [x] css style test form
- [x] Navbar styling

## Phase 9: add Search feature (0.5 day)

- [x] write instructions for the quiz
- [x] add clock feature to the test


- [x] backend, single-word, case-sensitive search functional
- [ ] language index for showing search result
- [ ] students index

## Phase 11: Final Touch (1.5day w9d4)
- [ ] invalid/unauthorized navigation redirected
- [ ] improve alerts
  - [ ] server errors

- [ ] welcome page
- [ ] about page
- [ ] logo

- [ ] standardize font sizes and colors
  - [ ] form input text colors
  - [ ] button colors and sizes

- [ ] pick font
- [ ] seed data
- [ ] when you log out while visiting page that require authorization, user is redirected
- [x] tell user if she is enrolled in the class on Klass page
- [x] improve demo sign-up
- [x] language select dropdown --> add default select "pick new"

- [x] Search Result title

## Phase 12: Refactor
- [ ] use stores instead of passing info as props
- [ ] refactor controllers based on design patterns: use presenters
- [ ] disable buttons after click
- [ ] refactor JavaScript code to minimize file size
- [ ] consolidate data parsing
- [ ] standardize name conventions
- [ ] check 'state' of each view file and evaluate the necessity
- [ ] check controlled values of each form and evaluate necessity
- [ ] check for unmounting
- [ ] CSS
- [ ] Views: get info from store instead of from props whenever possible

Index ->

KlassIndexStore
-> KlassIndex

LanguageIndexStore
-> LanguageIndex

StudySetIndexStore
TestScoreIndexStore

## Phase 10: Flashcards
- [ ] flashcard feature


## Phase12: bonus
- [ ] add filter to add-study-set page
