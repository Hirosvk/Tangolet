## users
column names    | Data Type | Details
----------------|-----------|---------------------
id              | integer   |    
username        | string    | null: false, unique: true  
password_digest | string    | null: false
email           | string    | null: false
session_token   | string    | null: false, unique: true

- user has many
  - sets_created
  - test_taken
  - klasses_created
  - klasses_enrolled

## study_sets
column names    | Data Type | Details
----------------|-----------|---------------------
id              | integer   |    
name            | string    | null: false
creator_id      | integer   | null: false, indexed

- study_set belongs to
  - creator(user)
- study_set has many
  - study_set_words: dependency: destroy
  - students
  - test_records
  - klasses

## study_set_words
column names    | Data Type | Details
----------------|-----------|---------------------
id              | integer   |   
study_set_id    | integer   | null: false, indexed
word_english    | string    | null: false, study_set_id/word_english unique: true
word_foreign    | string    | null: false, study_set_id/word_foreign unique: true

- study_set_word belongs to
  - study_set

## test_records
column names    | Data Type | Details
----------------|-----------|---------------------
id              | integer   |
user_id         | integer   | null: false, indexed
study_set_id    | integer   | null: false, indexed
score           | integer   | null: false, (in %, btw 0 and 100)

- test_record belongs to
  - user
  - study_set

## klasses
column names    | Data Type | Details
----------------|-----------|---------------------
id              | integer   |
name            | string    | null: false
description     | text      |
teacher_id      | integer   | null: false, indexed

- belongs to
  - teacher
- has many
  - students
  - study_sets

## klass_set_joins
column names    | Data Type | Details
----------------|-----------|---------------------
id              | integer   |
klass_id        | integer   | null: false,
study_set_id    | integer   | null: false, klass/set unique pair

- belongs to
  - study_set
  - klass

## enrollments
column names    | Data Type | Details
----------------|-----------|---------------------
id              | integer   |
klass_id        | integer   | null: false
student_id      | integer   | null: false, klass/student unique pair

- belongs to
  - klass
  - student(user)
