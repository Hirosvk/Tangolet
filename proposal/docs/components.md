## React Components Hierarchy

* **App**
  * Header
    * Search

  * Main
    * Content
      * Navbar
        * MyCreatedClassesIndex
        * MyEnrolledClassesIndex
        * MyStudySetIndex
        * Footer
      * SubContent
        * Index
        * **NewStudySetForm**
        * **NewClassForm**
        * **TestScores**
          * TestScoreItem
        * **Class**
          * AddStudySettoClassForm
          * ClassStudySetIndex
            * ClassStudySetIndexItem
          * **ProgressByStudySet** (only if the user is the Teacher)
            * ProgressByStudySetItem
          * **ProgressByStudent** (only if the user is the Teacher)
            * ProgressByStudentItem
        * **SearchResults**
          * SearchResultItem
        * **StudySet**
          * List
          * **Test**
            * TestForm

      * **LoginForm**
      * **SignupForm**

## Routes

* Component: App, Path: /
  * Component: Main
    * Component: Content(RouteIndex)
      * Component: Subcontent
        * Component: Index(RouteIndex)
        * Component: NewStudySetForm, Path: /create_study_set
        * Component: NewClassForm, Path: /create_class
        * Component: TestScores, Path: /test_scores
        * Component: Class, Path: /class/:id
          * Component: ClassStudySetIndex(RouteIndex)
          * Component: ProgressByStudySet, Path: /class/:id/by_study_sets
          * Component: ProgressByStudent, Path: /class/:id/by_students

        * Component: SearchResults, Path: /search_results

        * Component: StudySet, Path: /study_set/:id
          * Component: List (RouteIndex)
          * Component: Test, Path: /study_set/:id/test

    * Component: LoginForm, Path: /login
    * Component: SignupForm, Path: /signup

## Render Contents
* App
  * Header
    - [ ] currentUser's username
    - [ ] Logo
    * Search

  * Content
    - [ ] Navbar is a conditional render
    * Navbar
      * MyCreatedClassesIndex
        - [ ] links: classes the user created
        - [ ] Link: NewClassForm
      * MyEnrolledClassesIndex
        - [ ] links: classes enrolled
      * MyStudySetIndex
        - [ ] links: study sets the user created
        - [ ] link: NewStudySetForm
      - [ ] Link to TestScores
      * Footer
        - [ ] dummy company info & links

    * SubContent
      * Index
        - [ ] Welcome message and navigation tips
      * NewStudySetForm
      * NewClassForm
      * TestScores
          - [ ]TestScoreItem
          - [ ] render test score and link to the study set
      * Class
        - [ ] class title banner
        - [ ] toggle button to enroll in the class (if user is not the student or teacher)
        - [ ] delete class button (if user is the teacher)
        - [ ] AddStudySettoClassForm
        * ClassStudySetIndex
          * ClassStudySetIndexItem
            - [ ] render link to the study set
        * ProgressByStudySet (only if the user is the Teacher)
          * ProgressByStudySetItem
            - [ ] render data and link to the study set
        * ProgressByStudent (only if the user is the Teacher)
          * ProgressByStudentItem
            - [ ] render <li>
      * SearchResults
        * SearchResultItemClass
          - [ ] render link to the Class
        * SearchREsultItemStudySet
          - [ ] render link to the Study Set

      * StudySet
        - [ ] Study Set title banner
        - [ ] delete StudySet button
        - [ ] Back to Index link
        * List
        * Test
