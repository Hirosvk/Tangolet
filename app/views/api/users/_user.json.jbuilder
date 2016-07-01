json.extract! user, :id, :username, :email, :klass_ids

if details
  json.klasses user.klasses
  json.klasses_created user.klasses_created
  json.study_sets user.study_sets
end
