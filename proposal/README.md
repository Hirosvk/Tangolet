# Tangolet

  Heroku Link

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
- [ ] npm, webpack, bundlers, .gitignore setup
- [ ] user model
- [ ] session controller
- [ ] user controller
- [ ] authentication
- [ ] sign-up/log-in pages
- [ ] static pages
- [ ] basic header
- [ ] SessionAction Cycle

## Phase 2: Basic Models: study_sets & study_set_word (1day, W8D4)
- [ ] heroku setup

- [ ] study_set model
- [ ] study_set_word model
- [ ] validations
- [ ] setup JSON API for study_set
- [ ] study_set#create
- [ ] study_set#delete
- [ ] study_set#show

## Phase 3: Basic React/Flux components (1.5day, W8D5)
- [ ] StudySet & StudySetList React component
- [ ] Basic Router setup
- [ ] API Util: ajax GET, POST, DELETE request
- [ ] StudySetAction
- [ ] Dispatcher
- [ ] StudySetStore

- [ ] StudySetForm component

- [ ] Basic CSS Styling


## Phase 4: Add Class feature (2day, W8D7)
- [ ] build models: klasses
  - [ ] controllers: create, delete, update, show
- [ ] class forms: new & update
  - [ ] ClassAction
  - [ ] ClassStore
  - [ ] ClassStudySetStore


## Phase 5: Enrollment & Class/StudySet Join(1day)
- [ ] klass-set associations
  - [ ] rails backend
  - [ ] Api endpoint at KlassController using study_set_ids
  - [ ] add StudySet to class Form


- [ ] enrollment
  - [ ] model & migration
  - [ ] API endpoints & server routes
  - [ ] toggle button on Class page

- [ ] language
  - [ ] languages models
  - [ ] add language drop down to class/study_set form & actions
  - [ ] add language to class/study_set show

## Phase 6: Navbar (1day w9d1)
- [ ] backend setup
  - [ ] user.klasses_created, user.klasses_enrolled, user.study_sets_created
  - [ ] API endpoints and server router setup
- [ ] Navbar React Component
- [ ] UserAction
- [ ] NavbarStore
- [ ] ClassOptionBox for StudySetForm

## Phase 7: Styling (1day w9d2)
- [ ] CSS Styling
- [ ] footer

## Phase 8: add Test feature (2day w9d3)
- [ ] test_record model
- [ ] Test React component
- [ ] Test Scores
- [ ] ProgressByStudent & ProgressByStudySet

## Phase 9: add Search feature (0.5 day)

## Phase 10: Final Touch (1.5day w9d4)
- [ ] thorough styling
- [ ] seed data
- [ ] invalid/unauthorized navigation redirected

## Phase 11: Bonus
