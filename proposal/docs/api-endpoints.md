# html API
## Root
### GET /
  * static_page loads React App

# JSON API

## session

### POST /session/
* login: session#create
  * success: return currentUser(id, username)
  * failure: return error messages

### DELETE /session/
* logout: session#destroy
  * success: return {}
  * failure: return error messages

### POST /api/user/
* signup: user#create
  * login user
  * return currentUser on success
  * return full error messages on failure

### GET /api/user/
* require_current_user
* return names and id's of...
  * klasses (name&id) enrolled by the current_user
  * klasses (name&id)created by the current_user
  * study_sets (name&id) created by the current_user

### GET /api/user/test_scores
* require_current_user
* return test scores of the current_user
  * id, study_set_id, study_set_name, score, data_taken


## klasses
### GET /api/klasses/
* return all klasses created by all users

### GET /api/klasses/;id
* return klass info (id, name, description, teacher's username&id, created_at, num_of_students, num_of_study_set, enrollment_info)

### GET /api/klasses/:id/study_sets
* return Study Sets of the Klass (name, id)

### GET /api/klasses/:id/by_study_set
* return test scores grouped by study set
  * require current_user == teacher

### GET /api/klasses/:id/by_student
* return test scores grouped by student
  * require current_user == teacher

### POST /api/klasses/new
* create new klass with current_user.id as teacher_id
* params: klass_name, description, class_ids
  * require log-in
  * success: return the new klass
  * failure: return error messages

## enrollments
### DELETE /api/enrollments/:id
* delete a row from enrollments table
  * require log-in && current_user != teacher

### POST /api/enrollments/
* create new row in enrollments table with current_user_id
* params: class_id
  * require log-in && current_user != teacher


## study_sets
### GET /api/study_sets/
* return StudySets created by all users

### GET /api/study_sets/:id
* return single Study Set (name, creator's username, created_at, updated_at, words as nested hash)

### DELETE /api/study_sets/:id
  * delete the study set
    * require current_user == creator

### POST /api/study_sets/
  * create new study_set with current_user.id as creator_id
  * create new words
  * params: study_set_name, klass_ids as array, words as a hash map(key: word_english, val: word_foreign)
    * require log-in
    * success: return the new study set
    * failure: return error messages

## test_records
### POST /api/test_records
* submit test score (create new test_record) with current_user.id as user_id
* params: study_set_id, score
  * require log-in
  * success: confirmation message --> [client-side] redirect to test score
  * failure: error message

## klass_set_joins
### POST /api/klass_set_joins
* update klass.study_set_ids

## search
### GET /api/search?=[search_text]
* query search_text in DB for study_set_name, word, and class_name, and return results grouped by study set and class
