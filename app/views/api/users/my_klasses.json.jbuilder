json.my_created_klasses do
  json.partial! "api/klasses/klass",
                collection: @klasses_created,
                as: :klass,
                details: false
end

json.my_klasses do
  json.partial! "api/klasses/klass",
                collection: @klasses,
                as: :klass,
                details: false
end
