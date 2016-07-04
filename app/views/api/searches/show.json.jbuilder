json.languages do
  json.partial! "api/languages/language",
                collection: @languages,
                as: :language
end

json.study_sets do
  json.partial! "api/study_sets/study_set",
                collection: @study_sets,
                as: :study_set,
                details: false
end

json.klasses do
  json.partial! "api/klasses/klass",
                collection: @klasses,
                as: :klass,
                details: false
end
