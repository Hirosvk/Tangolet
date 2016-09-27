<<-SQL

SELECT
  study_sets.name AS name,
  study_sets.id AS id,
  CAST(AVG(tests.score) AS INT) AS average_score,
  COUNT(tests.id) AS num_of_tests_taken
FROM
  klasses JOIN klass_set_joins
  ON klasses.id = klass_set_joins.klass_id
  JOIN study_sets
  ON study_sets.id = klass_set_joins.study_set_id
  JOIN tests
  ON study_sets.id = tests.study_set_id
  JOIN users AS students
  ON tests.user_id = students.id
  JOIN users AS teachers
  ON klasses.teacher_id = teachers.id
WHERE
  klasses.id = 1 AND teachers.id = 1 AND
  students.id IN (
    SELECT
      students.id
    FROM
      klasses JOIN enrollments
      ON klasses.id = enrollments.klass_id
      JOIN users students
      ON students.id = enrollments.student_id
    WHERE
      enrollments.klass_id = 1
    )
GROUP BY
  study_sets.id

name             | id | average_score | num_of_tests_taken
------------------+----+---------------+--------------------
Geography        |  1 |            46 |                 28
Days of the week |  2 |            56 |                 27
verbs            |  3 |            46 |                 29
Location Words   |  4 |            51 |                 32
Body Parts       |  5 |            51 |                 29


  QUERY PLAN
------------------------------------------------------------------------------------------------------------------------------------------
 HashAggregate  (cost=56.73..56.76 rows=2 width=44)
   Group Key: study_sets.id
   ->  Hash Semi Join  (cost=29.70..56.72 rows=2 width=44)
         Hash Cond: (tests.user_id = enrollments.student_id)
         ->  Nested Loop  (cost=14.88..41.86 rows=4 width=52)
               ->  Nested Loop  (cost=14.74..41.05 rows=4 width=48)
                     ->  Nested Loop  (cost=0.15..11.02 rows=1 width=4)
                           ->  Index Scan using klasses_pkey on klasses  (cost=0.15..8.17 rows=1 width=8)
                                 Index Cond: (id = 1)
                                 Filter: (teacher_id = 1)
                           ->  Seq Scan on users teachers  (cost=0.00..2.84 rows=1 width=4)
                                 Filter: (id = 1)
                     ->  Nested Loop  (cost=14.59..29.99 rows=4 width=52)
                           Join Filter: (klass_set_joins.study_set_id = study_sets.id)
                           ->  Hash Join  (cost=14.44..25.24 rows=17 width=24)
                                 Hash Cond: (tests.study_set_id = klass_set_joins.study_set_id)
                                 ->  Seq Scan on tests  (cost=0.00..8.82 rows=482 width=16)
                                 ->  Hash  (cost=14.35..14.35 rows=7 width=8)
                                       ->  Bitmap Heap Scan on klass_set_joins  (cost=4.21..14.35 rows=7 width=8)
                                             Recheck Cond: (klass_id = 1)
                                             ->  Bitmap Index Scan on index_klass_set_joins_on_klass_id  (cost=0.00..4.21 rows=7 width=0)
                                                   Index Cond: (klass_id = 1)
                           ->  Index Scan using study_sets_pkey on study_sets  (cost=0.15..0.27 rows=1 width=36)
                                 Index Cond: (id = tests.study_set_id)
               ->  Index Only Scan using users_pkey on users students  (cost=0.14..0.19 rows=1 width=4)
                     Index Cond: (id = tests.user_id)
         ->  Hash  (cost=14.52..14.52 rows=24 width=8)
               ->  Nested Loop  (cost=2.85..14.52 rows=24 width=8)
                     ->  Index Only Scan using klasses_pkey on klasses klasses_1  (cost=0.15..8.17 rows=1 width=4)
                           Index Cond: (id = 1)
                     ->  Hash Join  (cost=2.70..6.11 rows=24 width=12)
                           Hash Cond: (students_1.id = enrollments.student_id)
                           ->  Seq Scan on users students_1  (cost=0.00..2.67 rows=67 width=4)
                           ->  Hash  (cost=2.40..2.40 rows=24 width=8)




Tangolet_development=# EXPLAIN   SELECT
     students.id
   FROM
     klasses JOIN enrollments
     ON klasses.id = enrollments.klass_id
     JOIN users students
     ON students.id = enrollments.student_id
   WHERE
     klasses.id = 1;
                                 QUERY PLAN
------------------------------------------------------------------------------
Nested Loop  (cost=2.78..7.50 rows=24 width=4)
  ->  Seq Scan on klasses  (cost=0.00..1.07 rows=1 width=4)
        Filter: (id = 1)
  ->  Hash Join  (cost=2.78..6.19 rows=24 width=8)
        Hash Cond: (students.id = enrollments.student_id)
        ->  Seq Scan on users students  (cost=0.00..2.67 rows=67 width=4)
        ->  Hash  (cost=2.48..2.48 rows=24 width=8)
              ->  Seq Scan on enrollments  (cost=0.00..2.48 rows=24 width=8)
                    Filter: (klass_id = 1)


Tangolet_development=# EXPLAIN SELECT student_id
FROM enrollments
WHERE klass_id = 3;
                         QUERY PLAN
------------------------------------------------------------
 Seq Scan on enrollments  (cost=0.00..2.48 rows=23 width=4)
   Filter: (klass_id = 3)
(2 rows)

SELECT
  study_sets.name AS name,
  study_sets.id AS id,
  CAST(AVG(tests.score) AS INT) AS average_score,
  COUNT(tests.id) AS num_of_tests_taken
FROM
  klasses JOIN klass_set_joins
  ON klasses.id = klass_set_joins.klass_id
  JOIN study_sets
  ON study_sets.id = klass_set_joins.study_set_id
  JOIN tests
  ON study_sets.id = tests.study_set_id
  JOIN users AS students
  ON tests.user_id = students.id
  JOIN users AS teachers
  ON klasses.teacher_id = teachers.id
WHERE
  klasses.id = 1 AND teachers.id = 1 AND
  students.id IN (
    SELECT student_id
    FROM enrollments
    WHERE klass_id = 1
    )
GROUP BY
  study_sets.id

  QUERY PLAN
--------------------------------------------------------------------------------------------------------------
 HashAggregate  (cost=12.22..12.46 rows=16 width=27)
   Group Key: study_sets.id
   ->  Hash Join  (cost=3.08..11.65 rows=76 width=27)
         Hash Cond: (tests.study_set_id = study_sets.id)
         ->  Nested Loop  (cost=0.42..8.94 rows=8 width=16)
               ->  Nested Loop  (cost=0.14..7.97 rows=1 width=12)
                     ->  Nested Loop  (cost=0.00..6.65 rows=1 width=8)
                           ->  Nested Loop  (cost=0.00..3.94 rows=1 width=4)
                                 ->  Seq Scan on klasses  (cost=0.00..1.09 rows=1 width=8)
                                       Filter: ((teacher_id = 1) AND (id = 1))
                                 ->  Seq Scan on users teachers  (cost=0.00..2.84 rows=1 width=4)
                                       Filter: (id = 1)
                           ->  Seq Scan on enrollments  (cost=0.00..2.48 rows=24 width=4)
                                 Filter: (klass_id = 1)
                     ->  Index Only Scan using users_pkey on users students  (cost=0.14..1.30 rows=1 width=4)
                           Index Cond: (id = enrollments.student_id)
               ->  Index Scan using index_tests_on_user_id on tests  (cost=0.27..0.89 rows=8 width=16)
                     Index Cond: (user_id = students.id)
         ->  Hash  (cost=2.60..2.60 rows=5 width=27)
               ->  Hash Join  (cost=1.31..2.60 rows=5 width=27)
                     Hash Cond: (study_sets.id = klass_set_joins.study_set_id)
                     ->  Seq Scan on study_sets  (cost=0.00..1.16 rows=16 width=19)
                     ->  Hash  (cost=1.25..1.25 rows=5 width=8)
                           ->  Seq Scan on klass_set_joins  (cost=0.00..1.25 rows=5 width=8)
                                 Filter: (klass_id = 1)
(25 rows)

SELECT
  study_sets.name AS name,
  study_sets.id AS id,
  CAST(AVG(tests.score) AS INT) AS average_score,
  COUNT(tests.id) AS num_of_tests_taken
FROM
  klasses JOIN klass_set_joins
  ON klasses.id = klass_set_joins.klass_id
  JOIN study_sets
  ON study_sets.id = klass_set_joins.study_set_id
  JOIN tests
  ON study_sets.id = tests.study_set_id
  JOIN users AS students
  ON tests.user_id = students.id
  JOIN users AS teachers
  ON klasses.teacher_id = teachers.id
WHERE
  klasses.id = 1 AND klasses.teacher_id = 1 AND
  students.id IN (
    SELECT student_id
    FROM enrollments
    WHERE klass_id = 1
    )
GROUP BY
  study_sets.id

SQL
