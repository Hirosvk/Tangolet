# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create!(username: "Hiro", password: "hirohiro", email: "hiro@hiro.com")
User.create!(username: "Nasley", password: "nasleynasley", email: "nasley@nasley.com")
User.create!(username: "Seiji", password: "koikoi", email: "seiji@seiji.com")

s1 = User.first.study_sets.new(name: "Japanese 1")
s1.words.new(word_english: "food", word_foreign: "tabemono")
s1.words.new(word_english: "car", word_foreign: "kuruma")
s1.words.new(word_english: "mother", word_foreign: "")
s1.words.new(word_english: "mother", word_foreign: "mama")
s1.save!

s2 = User.second.study_sets.new(name: "Spanish 1")
s2.words.new(word_english: "food", word_foreign: "comida")
s2.words.new(word_english: "car", word_foreign: "coche")
s2.words.new(word_english: "mother", word_foreign: "madre")
s2.words.new(word_english: "father", word_foreign: "padre")
s2.save!

User.first.klasses_created.create!(name: "Japanese 101", description: "It's great!")
User.first.klasses_created.create!(name: "Japanese 102", description: "It's fun!")
User.second.klasses_created.create!(name: "Spanish 101", description: "vamos a apprendir")
