json.extract! test, :id, :created_at

json.user do
  json.username test.user.username
  json.id test.user.id
end

json.study_set do
  json.name test.study_set.name
  json.id test.study_set.id
end
