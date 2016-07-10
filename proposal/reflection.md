# Challenge
* designing complex Flux cycle
  * spent many ours planning the flux cycle in the beginning
  * complexity that I did not foresee when I first had an idea
  * the plan shif

# Mistakes/Failures
* naming variables and data
  * especially between Ruby and JavaScript
## Index features
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


* study_set_form with adding words
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
* test join tables


# Enjoyed
* Applying nearly everything I learned in the program.
  * SQL, when I needed a complicated inquiry.
  * ActiveRecord's id assignments.
  * custom validation


# What to do differently
* keeping the code more DRY
* name functions and variables more descriptively
* custom error messages
