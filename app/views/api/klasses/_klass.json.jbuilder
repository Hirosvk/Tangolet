json.extract! klass, :id, :name

json.teacher do
  json.username klass.teacher.username
  json.id klass.teacher.id
end

json.language do
  json.name klass.language.name
  json.id klass.language.id
end

if details
  json.description klass.description
  json.created_at klass.created_at
  json.updated_at klass.updated_at
  json.study_set_ids klass.study_set_ids
end
