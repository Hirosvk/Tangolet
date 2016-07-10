class Api::TestsController < ApplicationController


  def index
    klass_id = params[:klass_id]
    study_set_id = params[:study_set_id]
    user_id = params[:user_id]

    if current_user
      teacher_id = current_user.id
      if klass_id && user_id
        @tests = Test.find_by_sql([QUERY_BY_STUDENTS, klass_id, user_id, teacher_id])
      elsif klass_id && study_set_id
        @tests = Test.find_by_sql([QUERY_BY_STUDYSETS, klass_id, study_set_id, teacher_id])
      else
        @tests = Test.find_by_sql([QUERY_BY_CURRENT_USER, teacher_id])
      end
      render json: @tests, status: 200
    else
      render json: "only the user and teacher get test scores", status: 401
    end
  end

  def collection
    option = params[:option]
    klass_id = params[:klass_id].to_i
    if current_user
      teacher_id = current_user.id

      if option == "by_study_sets"
        @tests = Test.find_by_sql([COLLECTION_QUERY_BY_STUDYSETS, klass_id, teacher_id, klass_id])
      elsif option == "by_students"
        @tests = Test.find_by_sql([COLLECTION_QUERY_BY_STUDENTS, klass_id, teacher_id, klass_id])
      end
      render json: @tests, status: 200
    else
      render json: "only the user and teacher get test scores", status: 401
    end
  end

  def is_current_user_teacher?(klass_id)
    Klass.find(ids[:klass_id]).teacher_id == current_user.id
  end

  COLLECTION_QUERY_BY_STUDYSETS = <<-SQL
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
      klasses.id = ? AND teachers.id = ? AND
      students.id IN (
        SELECT
          students.id
        FROM
          klasses JOIN enrollments
          ON klasses.id = enrollments.klass_id
          JOIN users students
          ON enrollments.student_id = students.id
        WHERE
          klasses.id = ?
        )
    GROUP BY
      study_sets.id
  SQL


  COLLECTION_QUERY_BY_STUDENTS = <<-SQL
    SELECT
      students.username AS name,
      students.id AS id,
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
      klasses.id = ? AND teachers.id = ? AND
      students.id IN (
        SELECT
          students.id
        FROM
          klasses JOIN enrollments
          ON klasses.id = enrollments.klass_id
          JOIN users students
          ON enrollments.student_id = students.id
        WHERE
          klasses.id = ?
        )
    GROUP BY
      students.id
  SQL

  QUERY_BY_STUDENTS = <<-SQL
  SELECT
    DISTINCT
    study_sets.name AS study_set_name,
    study_sets.id AS study_set_id,
    tests.score AS score,
    tests.created_at AS created_at,
    students.username AS student_username,
    students.id AS student_id,
    tests.id AS id
  FROM
    tests JOIN study_sets
    ON tests.study_set_id = study_sets.id
    JOIN klass_set_joins
    ON study_sets.id = klass_set_joins.study_set_id
    JOIN klasses
    ON klass_set_joins.klass_id = klasses.id
    JOIN users students
    ON tests.user_id = students.id
    JOIN users teachers
    ON klasses.teacher_id = teachers.id
  WHERE
    klasses.id = ? AND students.id = ?
    AND teachers.id = ? AND teachers.id != students.id
  ORDER BY
    tests.created_at
  SQL

  QUERY_BY_STUDYSETS = <<-SQL
  SELECT
    DISTINCT
    study_sets.name AS study_set_name,
    study_sets.id AS study_set_id,
    tests.score AS score,
    tests.created_at AS created_at,
    students.username AS student_username,
    students.id AS student_id,
    tests.id AS id
  FROM
    tests JOIN study_sets
    ON tests.study_set_id = study_sets.id
    JOIN klass_set_joins
    ON study_sets.id = klass_set_joins.study_set_id
    JOIN klasses
    ON klass_set_joins.klass_id = klasses.id
    JOIN users students
    ON tests.user_id = students.id
    JOIN users teachers
    ON klasses.teacher_id = teachers.id
  WHERE
    klasses.id = ? AND study_sets.id = ?
    AND teachers.id = ? AND teachers.id != students.id
  ORDER BY
    tests.created_at
  SQL

  QUERY_BY_CURRENT_USER = <<-SQL
  SELECT
    DISTINCT
    study_sets.name AS study_set_name,
    study_sets.id AS study_set_id,
    tests.score AS score,
    tests.created_at AS created_at,
    students.username AS student_username,
    students.id AS student_id,
    tests.id AS id
  FROM
    tests JOIN study_sets
    ON tests.study_set_id = study_sets.id
    JOIN users students
    ON tests.user_id = students.id
  WHERE
    students.id = ?
  ORDER BY
    tests.created_at
  SQL
end
