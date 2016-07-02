# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#

User.destroy_all
Klass.destroy_all
Language.destroy_all
StudySet.destroy_all

User.create!(username: "Hiro", password: "hirohiro", email: "hiro@hiro.com")
User.create!(username: "Nasley", password: "nasleynasley", email: "nasley@nasley.com")
User.create!(username: "Seiji", password: "koikoi", email: "seiji@seiji.com")

Language.create!(name: "Japanese")
Language.create!(name: "Spanish")
Language.create!(name: "German")
Language.create!(name: "Portuguese")
Language.create!(name: "French")
Language.create!(name: "Italian")
Language.create!(name: "Toddler-ese")
Language.create!(name: "other")

User.first.klasses_created.create!(name: "Japanese 101", description: "It's great!", language_id: Language.find_by_name("Japanese").id)
User.first.klasses_created.create!(name: "Japanese 102", description: "It's fun!", language_id: Language.find_by_name("Japanese").id)
User.second.klasses_created.create!(name: "Spanish 101", description: "vamos a apprendir", language_id: Language.find_by_name("Spanish").id)
User.third.klasses_created.create!(name: "Toddler-ese", description: "tadatada, detdet, wawawawa", language_id: Language.find_by_name("Toddler-ese").id)

s1 = User.first.study_sets.new(name: "basic Japanese words", language_id: Language.find_by_name("Japanese").id)
s1.words.new(word_english: "food", word_foreign: "tabemono")
s1.words.new(word_english: "car", word_foreign: "kuruma")
s1.words.new(word_english: "mother", word_foreign: "okasan")
s1.save!
#
s2 = User.second.study_sets.new(name: "Spanish 1", language_id: Language.find_by_name("Spanish").id)
s2.words.new(word_english: "food", word_foreign: "comida")
s2.words.new(word_english: "car", word_foreign: "coche")
s2.words.new(word_english: "mother", word_foreign: "madre")
s2.words.new(word_english: "father", word_foreign: "padre")
s2.save!
#
s3 = User.second.study_sets.new(name: "Spanish 2", language_id: Language.find_by_name("Spanish").id)
s3.words.new(word_english: "head", word_foreign: "cabeza")
s3.words.new(word_english: "hand", word_foreign: "mano")
s3.words.new(word_english: "sister", word_foreign: "hermana")
s3.words.new(word_english: "brother", word_foreign: "hermano")
s3.save!

s4 = User.third.study_sets.new(name: "Seiji's words", language_id: Language.find_by_name("Toddler-ese").id)
s4.words.new(word_english: "more", word_foreign: "dadadadada")
s4.words.new(word_english: "papa", word_foreign: "dada")
s4.words.new(word_english: "mama", word_foreign: "ma")
s4.words.new(word_english: "excited", word_foreign: "koikoikoi")
s4.save!


one = StudySet.first.id
two = StudySet.second.id
three = StudySet.third.id
four = StudySet.fourth.id

Klass.first.study_set_ids = [one]
Klass.second.study_set_ids = [one]
Klass.third.study_set_ids = [two,three]
Klass.fourth.study_set_ids = [four]

one = Klass.first.id
two = Klass.second.id
three = Klass.third.id
four = Klass.fourth.id

User.second.klass_ids = [one,two, four]
User.third.klass_ids = [one,two,three]
User.first.klass_ids = [four]
