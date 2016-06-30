json.extract! klass, :id, :name, :description

json.teacher do
  json.username klass.teacher.username
  json.id klass.teacher.id
end
