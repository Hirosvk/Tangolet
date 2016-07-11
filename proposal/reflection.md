# Challenge
* designing complex Flux cycle
  * spent many ours planning the flux cycle in the beginning
  * complexity that I did not foresee when I first had an idea
  * the plan changed quite a bit as I start coding.


# Failure and Fix: Index features
  * For example, on my original design, StudySetIndex would get data from different stores based on props. When it's a child of Index view, it would fire an ajax request to the server, and the response goes to IndexStore. On the other hand, when it's a child of Klass view, it would not fire a query and get study_set data from KlassStore.
  * This soon became too complicated and was a source of many bugs. the same component was listening for different Stores on any given time, and removal of listener was not executed correctly(i.e. removing non-existing listeners, or not removing existing listeners upon unmounting.) It would not update with the correnct information.
  * similar issues occured for other Index components
  * I solved the issue by re-organizing the Flux cycle.
    * Got rid of IndexStore, and many separate store for each Index view.
    * Only parent views make ajax request to the server, and made sure that Actions appropriately distribute the response data to the right stores. For example, when Klass view is rendered and make a server query, response is stored in StudySetIndexStore.
    * StudySetIndes listens to just one store, and it's only job is to render what's in the store.
    * This way, whenever the view changes, parent component will make necessary server query.

# Proud
* custom CSS
  * Many of my peers used out-of-the-box React Bootstrap, I customized many if its designs to achieve original look.
  * understood what React Bootstraps does. For example, one component in Bootstrap produces several nested HTML components. It made event handling tricky(i.e. target and currentTarget), but I easily figured out.

* add-study-set-form
  * handles two different data sets: Klass and StudySetPool
  * the view renders the list of StudySets (from StudySetPool) as ListGroup
  * The study_sets that are already in the Klass will be render as "active"
  * When a studySet is clicked, it updates this.state.study_set_ids, which triggers re-render
  * Users can toggle between including the whole list of study sets, or only from her study sets.
  * When the data is sent, it sends "dummy" when the array is empty.


* study_set_form with adding words: this feature helped me understand how to use different sets of data in the view(state, and instance var)
  * feature summary
    * create a new Study set
    * can add any number of words
    * on back-end, Study Sets and Words are in different tables
    * edit: it will be redirected from Study Set view
    * Form sees if the it's edit from the parameter
    * prefills <input> with the klass data
    * on submit, takes different actions depending on edit status.

  * instance var: this.id, this.edit
    * why?
    * they don't change over the lifecycle of the component
  * state: languagePicked, name, submitting, languages
    * why?
    * languages -> it fetches AllLanguages when the component mounts
    * name & languagePicked -> their state changes as input. When it's 'edit', it needs to pre-fill the input. What if it was an instance var? -> when you receive the data on 'edit' and put them as 'value' attribute on <input>, React gives error saying that the input needs to be either controlled or uncontrolled.
  * psudo-state(as global var): words
    * why?
    * as 'state' it's a trouble to update an array.
    * on 'edit', or when adding new word rows and re-render, we need to pre-fill the table by using 'value' attribute in <input>. React gives error if the <input> is not controlled.


* test form
   * Test receives words as props
   * When use clicks "begin test", Test view generates test words:
    * shuffles the order
    * limit word to 10 if the words.length > 10
    * randomly pick which word is blank(English vs. foreign)
    * pass the words as props to the Modal; the props contain array of word-pairs, with complete pair, and which word should be blank(words[0].blank).

  * when 'submit' is clicked, it triggers grading and submitting of score
  * testRowsGraded:
    * iterate through the words.
    * determines if <input>.value matches the right answer
    * increment the score
    * determines the CSS style that matches the answer
    * renders the answers

  * submitTest() waits for the test to be graded (listener is set with setInterval)


# Enjoyed
* Applying nearly everything I learned in the program.
  * SQL, when I needed a complicated inquiry.
  * ActiveRecord's id assignments.
  * custom validation
* figuring out the complexity of the app, especially Flux Cycle.

# bugs
* most mysterious and time-consuming bugs came from spelling errors
* others were about understanding the complexity of Flux cycles. Though some took a while to debug, they were very educational and never felt like I wasted time on them. At the end of the making, I feel that I have a firm grasp on how Flux cycle works.
* I approached the problem by isolating the issue: putting debuggers and console.logs, and going through step by step, checking each variables until I find it.
* Though some errors took time to solve, I always felt I was making progress toward solving it.

* flux cycle malfunction -> solved by re-organizing the cycle
* flux timing issue
  * submitting test before graded
  * reading the values of the state that has not been updated after mount -> solved by giving empty objects/arrays instead of undefined. Also by tweaking componentWill/DidMount.
  * some other bugs came from going a view to view, and certain component does not unmount, but receive new props. (it appears as if they were different component, but React optimize re-rendering and only updates changes).
  * --> fixed by putting componentWillReceiveProps and triggering necessary updates.
  * --> in the case of Index views, I just made sure that Stores are updated correctly.

# What to do differently
* keeping the code more DRY
* name functions and variables more descriptively
* custom error messages
