json.extract! study_set, :id, :name
json.language study_set.language, partial: "api/languages/language", as: :language

json.creator  do
  json.id study_set.creator.id
  json.username study_set.creator.username
end

if !details.nil?
  json.words study_set.words do |word|
    json.word_english word.word_english
    json.word_foreign word.word_foreign
  end
  json.created_at study_set.created_at
  json.updated_at study_set.updated_at
  json.klass_ids study_set.klass_ids
end
