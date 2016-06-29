json.extract! study_set, :id, :name, :created_at, :updated_at

json.creator  do
  json.id study_set.creator.id
  json.username study_set.creator.username
end

json.words study_set.words do |word|
  json.word_english word.word_english
  json.word_foreign word.word_foreign
end
