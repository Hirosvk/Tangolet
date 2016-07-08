[Tangolet_link]: http://tangolet.heroku.com
[Quizlet_link]: http://www.quizlet.com

# Tangolet
[Tangolet][Tangolet_link] helps users memorize words in foreign languages, and was inspired by a popular classroom web app, [Quizlet][Quizlet_link]. ("Tango" means "word" or "vocabulary" in Japanese.)

## Main features
### Study Set
* User can create Study Set, a vocabulary list, with any number of words.
* User can edit her Study Set
* Following features are available for each Study Set
  * List: view the vocabulary list
  * Flashcards: learn words by virtual Flashcards
  * Test: take randomly generated test

### Class
* Users can create and edit their Class
* Teacher (creator) can add Study Sets to the Class
* On the Class page, students can view the Study Sets made available by the Teacher.
* User can enroll in the Class by clicking Enroll/Unenroll button on the Class page


### Test
* User can view her own past test records
* Teachers can view students' test scores grouped by the Study Set or by Students. The average score is also provided. (This feature only displays the scores of the Study Sets that are included in the Class, and the ones taken by those who are enrolled in the class.)


### Search/Browse
* User can search for Class, Study Set(including each vocabulary), and Language with the Search Bar.
* User can search for Class and Study Sets by the language through "Languages" button displays.

### User Authentication
* User can sign-up and log-in
* Many features require users to be logged in
* Demo log-in feature is available


## Technical

### Frontend
* React.js
* React Router with Flux architecture
* React Bootstrap with custom CSS
* HTML

### Backend
* Ruby on Rails
* PostgreSQL database
