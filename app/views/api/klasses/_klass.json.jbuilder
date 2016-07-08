json.extract! klass, :id, :name

json.teacher do
  json.username klass.teacher.username
  json.id klass.teacher.id
end

json.language klass.language, partial: "api/languages/language", as: :language

if details
  json.description klass.description
  json.created_at klass.created_at
  json.students klass.students
  json.study_set_ids klass.study_set_ids
  json.study_sets do
    json.partial! "api/study_sets/study_set", collection: klass.study_sets, as: :study_set, details: false
  end
end
