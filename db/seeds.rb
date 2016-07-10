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
Test.destroy_all

u1 = User.create!(username: "Hiro", password: "hirohiro", email: "hiro@hiro.com")
u2 = User.create!(username: "Nasley", password: "nasleynasley", email: "nasley@nasley.com")
u3 = User.create!(username: "Seiji", password: "koikoi", email: "seiji@seiji.com")
u4 = User.create!(username: "Madeline", password: 'madeline', email: "madeline@madeline.com")

Language.create!(name: "Japanese")
Language.create!(name: "Spanish")
Language.create!(name: "Korean")
Language.create!(name: "Mandarin")
Language.create!(name: "German")
Language.create!(name: "Portuguese")
Language.create!(name: "French")
Language.create!(name: "Italian")
Language.create!(name: "Toddler-ese")
Language.create!(name: "other")

c1 = u1.klasses_created.create!(name: "Japanese 101", description: "We will study the basic Japanese grammar and vocabularies.", language_id: Language.find_by_name("Japanese").id)
c2 = u1.klasses_created.create!(name: "Japanese 102", description: "We will study advanced Japanese grammar. Prerequisite: Japanse 101", language_id: Language.find_by_name("Japanese").id)
c3 = u2.klasses_created.create!(name: "Spanish 2", description: "You will be fluent in Spanish in 3 months! Please bring the text book on the first day.", language_id: Language.find_by_name("Spanish").id)
c4 = u2.klasses_created.create!(name: "Spanish 3", description: "The course covers advanced Spanish grammar.", language_id: Language.find_by_name("Spanish").id)
c5 = u3.klasses_created.create!(name: "Toddler-ese", description: "tadatada, detdet, wawawawa", language_id: Language.find_by_name("Toddler-ese").id)
c6 = u4.klasses_created.create!(name: "French", description: "basic French", language_id: Language.find_by_name("French").id)

s1 = u1.study_sets.new(name: "Geography", language_id: Language.find_by_name("Japanese").id)
s1.words.new(word_foreign: "うみ", word_english: "ocean")
s1.words.new(word_foreign: "みずうみ", word_english: "lake")
s1.words.new(word_foreign: "いけ", word_english: "pond")
s1.words.new(word_foreign: "かわ", word_english: "river")
s1.words.new(word_foreign: "わん", word_english: "bay")
s1.words.new(word_foreign: "やま", word_english: "mountain")
s1.words.new(word_foreign: "たに", word_english: "valley")
s1.words.new(word_foreign: "さばく", word_english: "desert")
s1.words.new(word_foreign: "もり", word_english: "forest")
s1.words.new(word_foreign: "き", word_english: "tree")
s1.words.new(word_foreign: "こうえん", word_english: "park")
s1.words.new(word_foreign: "しま", word_english: "island")
s1.words.new(word_foreign: "まち", word_english: "town")
s1.words.new(word_foreign: "し", word_english: "city")
s1.words.new(word_foreign: "むら", word_english: "village")
s1.save!

s2 = u1.study_sets.new(name: "Days of the week", language_id: Language.find_by_name("Japanese").id)
s2.words.new(word_foreign: "にちようび", word_english: "Sunday")
s2.words.new(word_foreign: "げつようび", word_english: "Monday")
s2.words.new(word_foreign: "かようび", word_english: "Tuesday")
s2.words.new(word_foreign: "すいようび", word_english: "Wednesday")
s2.words.new(word_foreign: "もくようび", word_english: "Thursday")
s2.words.new(word_foreign: "きんようび", word_english: "Friday")
s2.words.new(word_foreign: "どようび", word_english: "Saturday")
s2.save!

s3 = u1.study_sets.new(name: "verbs", language_id: Language.find_by_name("Japanese").id)
s3.words.new(word_foreign: "いく", word_english: "to go")
s3.words.new(word_foreign: "かえる", word_english: "to go back")
s3.words.new(word_foreign: "きく", word_english: "to listen")
s3.words.new(word_foreign: "のむ", word_english: "to drink")
s3.words.new(word_foreign: "はなす", word_english: "to speak")
s3.words.new(word_foreign: "よむ", word_english: "to read")
s3.words.new(word_foreign: "おきる", word_english: "to get up")
s3.words.new(word_foreign: "たべる", word_english: "to eat")
s3.words.new(word_foreign: "ねる", word_english: "to sleep")
s3.words.new(word_foreign: "みる", word_english: "to see")
s3.words.new(word_foreign: "くる", word_english: "to come")
s3.words.new(word_foreign: "する", word_english: "to do")
s3.words.new(word_foreign: "べんきょうする", word_english: "to study")
s3.save!

s4 = u1.study_sets.new(name: "Location Words", language_id: Language.find_by_name("Japanese").id)
s4.words.new(word_foreign: "まえ", word_english: "front")
s4.words.new(word_foreign: "うしろ", word_english: "back")
s4.words.new(word_foreign: "なか", word_english: "inside")
s4.words.new(word_foreign: "そと", word_english: "outside")
s4.words.new(word_foreign: "うえ", word_english: "top")
s4.words.new(word_foreign: "した", word_english: "underneath")
s4.words.new(word_foreign: "となり", word_english: "next to")
s4.words.new(word_foreign: "きた", word_english: "north")
s4.words.new(word_foreign: "みなみ", word_english: "south")
s4.words.new(word_foreign: "にし", word_english: "west")
s4.words.new(word_foreign: "ひがし", word_english: "east")
s4.save!


s5 = u1.study_sets.new(name: "Body Parts", language_id: Language.find_by_name("Japanese").id)
s5.words.new(word_foreign: "ひと", word_english: "person")
s5.words.new(word_foreign: "からだ", word_english: "body")
s5.words.new(word_foreign: "て", word_english: "hand")
s5.words.new(word_foreign: "うで", word_english: "arm")
s5.words.new(word_foreign: "あし", word_english: "leg")
s5.words.new(word_foreign: "おなか", word_english: "stomach")
s5.words.new(word_foreign: "め", word_english: "eye")
s5.words.new(word_foreign: "はな", word_english: "nose")
s5.words.new(word_foreign: "くち", word_english: "mouth")
s5.words.new(word_foreign: "みみ", word_english: "ear")
s5.words.new(word_foreign: "かみのけ", word_english: "hair")
s5.save!

s6 = u1.study_sets.new(name: "Family", language_id: Language.find_by_name("Japanese").id)
s6.words.new(word_foreign: "おとうさん", word_english: "father")
s6.words.new(word_foreign: "おかあさん", word_english: "mother")
s6.words.new(word_foreign: "おにいさん", word_english: "older brother")
s6.words.new(word_foreign: "おとうと", word_english: "younger brother")
s6.words.new(word_foreign: "おねえさん", word_english: "older sister")
s6.words.new(word_foreign: "いもうと", word_english: "younger sister")
s6.words.new(word_foreign: "おばあちゃん", word_english: "grandmother")
s6.words.new(word_foreign: "おじいちゃん", word_english: "grandfather")
s6.words.new(word_foreign: "おじさん", word_english: "uncle")
s6.words.new(word_foreign: "おばさん", word_english: "aunt")
s6.words.new(word_foreign: "ともだち", word_english: "friend")
s6.save!

s7 = u1.study_sets.new(name: "frequency adverbs", language_id: Language.find_by_name("Japanese").id)
s7.words.new(word_foreign: "いつも", word_english: "always")
s7.words.new(word_foreign: "よく", word_english: "often")
s7.words.new(word_foreign: "たいてい", word_english: "usually")
s7.words.new(word_foreign: "ときどき", word_english: "sometimes")
s7.words.new(word_foreign: "あまり", word_english: "rarely")
s7.words.new(word_foreign: "ぜんぜん", word_english: "not at all")
s7.save!


s8 = u2.study_sets.new(name: "Lesson 1 Vocabulary", language_id: Language.find_by_name("Spanish").id)
s8.words.new(word_foreign: "Conejo".downcase, word_english: "Rabbit".downcase)
s8.words.new(word_foreign: "Sombrero".downcase, word_english: "Hat".downcase)
s8.words.new(word_foreign: "Hoja".downcase, word_english: "Leaf".downcase)
s8.words.new(word_foreign: "Ojo".downcase, word_english: "Eye".downcase)
s8.words.new(word_foreign: "Zapato".downcase, word_english: "Shoe".downcase)
s8.words.new(word_foreign: "Oruga".downcase, word_english: "Caterpillar".downcase)
s8.words.new(word_foreign: "Vaca".downcase, word_english: "Cow".downcase)
s8.words.new(word_foreign: "Pollo".downcase, word_english: "Chicken".downcase)
s8.words.new(word_foreign: "Pez".downcase, word_english: "Fish".downcase)
s8.words.new(word_foreign: "Niño".downcase, word_english: "Boy".downcase)
s8.words.new(word_foreign: "Niña".downcase, word_english: "Girl".downcase)
s8.words.new(word_foreign: "Naranja".downcase, word_english: "Orange".downcase)
s8.save!

s9 = u2.study_sets.new(name: "Lesson 2 Vocabulary", language_id: Language.find_by_name("Spanish").id)
s9.words.new(word_foreign: "tener", word_english: "to have")
s9.words.new(word_foreign: "yo tengo", word_english: "I have")
s9.words.new(word_foreign: "tu tienes", word_english: "you have")
s9.words.new(word_foreign: "el/ella tiene", word_english: "He she has")
s9.words.new(word_foreign: "osotros tenemos", word_english: "we have")
s9.words.new(word_foreign: "ustedes tienen", word_english: "you all have")
s9.words.new(word_foreign: "perro", word_english: "dog")
s9.words.new(word_foreign: "gato", word_english: "cat")
s9.words.new(word_foreign: "anillo", word_english: "ring")
s9.words.new(word_foreign: "pelo", word_english: "air")
s9.words.new(word_foreign: "tarjetas", word_english: "cards")
s9.words.new(word_foreign: "cabeza", word_english: "ead")
s9.words.new(word_foreign: "dientes", word_english: "teeth")
s9.save!

s10 = u2.study_sets.new(name: "Lesson 3 Vocabulary", language_id: Language.find_by_name("Spanish").id)
s10.words.new(word_foreign: "vestir", word_english: "to wear")
s10.words.new(word_foreign: "yo visto", word_english: "I wear")
s10.words.new(word_foreign: "tu vistes", word_english: "you wear")
s10.words.new(word_foreign: "el/ella viste", word_english: "e/she wears")
s10.words.new(word_foreign: "osotros vestimos", word_english: "we wear")
s10.words.new(word_foreign: "ustedes visten", word_english: "you all wear")
s10.words.new(word_foreign: "ellos visten", word_english: "they wear")
s10.words.new(word_foreign: "amarillo", word_english: "yellow")
s10.words.new(word_foreign: "blanco", word_english: "white")
s10.words.new(word_foreign: "egro", word_english: "black")
s10.words.new(word_foreign: "rojo", word_english: "red")
s10.words.new(word_foreign: "morado", word_english: "purple")
s10.words.new(word_foreign: "rosa/rosado", word_english: "pink")
s10.words.new(word_foreign: "azul", word_english: "blue")
s10.words.new(word_foreign: "anaranjado", word_english: "orange")
s10.words.new(word_foreign: "verde", word_english: "green")
s10.words.new(word_foreign: "gris", word_english: "grey")
s10.words.new(word_foreign: "beige", word_english: "beige")
s10.words.new(word_foreign: "playera", word_english: "t-shirt")
s10.words.new(word_foreign: "blusa", word_english: "blouse")
s10.words.new(word_foreign: "shorts", word_english: "orts")
s10.words.new(word_foreign: "overales", word_english: "overalls")
s10.words.new(word_foreign: "calcetines", word_english: "socks (male)")
s10.words.new(word_foreign: "platano", word_english: "banana")
s10.words.new(word_foreign: "calcetas", word_english: "socks (female)")
s10.save!

s11 = u2.study_sets.new(name: "Lesson 4 Vocabulary(body parts 1)", language_id: Language.find_by_name("Spanish").id)
s11.words.new(word_foreign: "el brazo", word_english: "arm")
s11.words.new(word_foreign: "el codo", word_english: "elbow")
s11.words.new(word_foreign: "el hombro", word_english: "oulder")
s11.words.new(word_foreign: "el estómago", word_english: "stomach")
s11.words.new(word_foreign: "el dedo", word_english: "finger")
s11.words.new(word_foreign: "el dedo de pie", word_english: "toe")
s11.words.new(word_foreign: "el pie", word_english: "foot")
s11.words.new(word_foreign: "la mano", word_english: "and")
s11.words.new(word_foreign: "la muñeca", word_english: "wrist")
s11.words.new(word_foreign: "la pierna", word_english: "leg")
s11.words.new(word_foreign: "la rodilla", word_english: "knee")
s11.words.new(word_foreign: "la cintura", word_english: "waist")
s11.words.new(word_foreign: "la cadera", word_english: "ip")
s11.words.new(word_foreign: "la palma", word_english: "palm")
s11.words.new(word_foreign: "el tobillo", word_english: "ankle")
s11.words.new(word_foreign: "la barba", word_english: "beard")
s11.words.new(word_foreign: "los dientes", word_english: "teeth")
s11.words.new(word_foreign: "la espalda", word_english: "back")
s11.words.new(word_foreign: "los ojos", word_english: "eyes")
s11.words.new(word_foreign: "las piernas", word_english: "legs")
s11.words.new(word_foreign: "las manos", word_english: "ands")
s11.save!

s12 = u2.study_sets.new(name: "Lesson 4 Vocabulary(body parts 2)", language_id: Language.find_by_name("Spanish").id)
s12.words.new(word_foreign: "el pecho", word_english: "chest")
s12.words.new(word_foreign: "los pies", word_english: "feet")
s12.words.new(word_foreign: "las orejas", word_english: "ears")
s12.words.new(word_foreign: "los hombros", word_english: "oulders")
s12.words.new(word_foreign: "el pelo", word_english: "air")
s12.words.new(word_foreign: "el bigote", word_english: "mustache")
s12.words.new(word_foreign: "la boca", word_english: "mouth")
s12.words.new(word_foreign: "los labios", word_english: "lips")
s12.words.new(word_foreign: "la sonrisa", word_english: "smile")
s12.words.new(word_foreign: "las cejas", word_english: "eyebrows")
s12.words.new(word_foreign: "el cuello", word_english: "neck")
s12.words.new(word_foreign: "el cuerpo", word_english: "body")
s12.words.new(word_foreign: "las uñas", word_english: "nails")
s12.words.new(word_foreign: "el torzo", word_english: "torso")
s12.words.new(word_foreign: "la frente", word_english: "forehead")
s12.words.new(word_foreign: "la nariz", word_english: "nose")
s12.words.new(word_foreign: "las pestañas", word_english: "eyelashes")
s12.words.new(word_foreign: "la barbilla", word_english: "chin")
s12.save!




s13 = u3.study_sets.new(name: "Seiji's words", language_id: Language.find_by_name("Toddler-ese").id)
s13.words.new(word_english: "more", word_foreign: "dadadadada")
s13.words.new(word_english: "papa", word_foreign: "dada")
s13.words.new(word_english: "mama", word_foreign: "ma")
s13.words.new(word_english: "excited", word_foreign: "koikoikoi")
s13.save!

s14 = u4.study_sets.new(name: "Family", language_id: Language.find_by_name("French").id)
s14.words.new(word_foreign:  "Le frère", word_english: "Brother".downcase)
s14.words.new(word_foreign:  "L'oncle", word_english: "Uncle".downcase)
s14.words.new(word_foreign:  "La tante", word_english: "Aunt".downcase)
s14.words.new(word_foreign:  "La femme", word_english: "Wife".downcase)
s14.words.new(word_foreign:  "Le mari", word_english: "Husband".downcase)
s14.words.new(word_foreign:  "Le beau-père", word_english: "Step-father".downcase)
s14.words.new(word_foreign:  "La belle-mère", word_english: "Step-mother".downcase)
s14.words.new(word_foreign:  "La demi-soeur", word_english: "Half-sister/Step-sister".downcase)
s14.words.new(word_foreign:  "Le demi-frère", word_english: "Half-brother/Step-brother".downcase)
s14.words.new(word_foreign:  "La grand-mère", word_english: "Grandmother".downcase)
s14.words.new(word_foreign:  "Le grand-père", word_english: "Grandfather".downcase)
s14.words.new(word_foreign:  "Le petit-fils", word_english: "Grandson".downcase)
s14.words.new(word_foreign:  "La petite-fille", word_english: "Granddaughter".downcase)
s14.words.new(word_foreign:  "Les arrière-grand-parents", word_english: "Great-grandparents".downcase)
s14.words.new(word_foreign:  "La belle-mère", word_english: "Mother-in-law".downcase)
s14.words.new(word_foreign:  "Le beau-père", word_english: "Father-in-law".downcase)
s14.words.new(word_foreign:  "La belle-fille", word_english: "Daughter-in-law".downcase)
s14.words.new(word_foreign:  "Le gendre", word_english: "Son-in-law".downcase)
s14.words.new(word_foreign:  "Les cousins", word_english: "Cousins".downcase)
s14.words.new(word_foreign:  "La cousine", word_english: "Female cousin".downcase)
s14.words.new(word_foreign:  "Le cousin", word_english: "Male cousin".downcase)
s14.words.new(word_foreign:  "La nièce", word_english: "Niece".downcase)
s14.words.new(word_foreign:  "Le neveu", word_english: "Nephew".downcase)
s14.save!


s15 = u4.study_sets.new(name: "House", language_id: Language.find_by_name("French").id)
s15.words.new(word_foreign: "La maison", word_english: "House".downcase)
s15.words.new(word_foreign: "Un appartement", word_english: "Apartment".downcase)
s15.words.new(word_foreign: "Le salon", word_english: "Living room".downcase)
s15.words.new(word_foreign: "La cuisine", word_english: "Kitchen".downcase)
s15.words.new(word_foreign: "La salle à manger", word_english: "Dining room".downcase)
s15.words.new(word_foreign: "La chambre", word_english: "Bedroom".downcase)
s15.words.new(word_foreign: "La salle de bains", word_english: "Bathroom".downcase)
s15.words.new(word_foreign: "Le jardin", word_english: "Garden".downcase)
s15.words.new(word_foreign: "Le garage", word_english: "Garage".downcase)
s15.save!

s16 = u4.study_sets.new(name: "Colors", language_id: Language.find_by_name("French").id)
s16.words.new(word_english: "red", word_foreign: "rouge")
s16.words.new(word_english: "yellow", word_foreign: "jaune")
s16.words.new(word_english: "light", word_foreign: "bleu(e)")
s16.words.new(word_english: "purple", word_foreign: "violet(te)")
s16.words.new(word_english: "pink", word_foreign: "rosé(e)")
s16.words.new(word_english: "green", word_foreign: "vert(e)")
s16.words.new(word_english: "white", word_foreign: "blanc(he)")
s16.words.new(word_english: "black", word_foreign: "oir(e)")
s16.words.new(word_english: "brown", word_foreign: "marron(ne)")
s16.words.new(word_english: "gray", word_foreign: "gris(e)")
s16.words.new(word_english: "orange", word_foreign: "orange")
s16.save!


c1.study_set_ids = [s1.id, s2.id, s3.id, s4.id, s5.id]
c2.study_set_ids = [s4.id, s5.id, s6.id, s7.id]
c3.study_set_ids = [s8.id, s9.id, s10.id, s11.id]
c4.study_set_ids = [s10.id, s11.id, s12.id]
c5.study_set_ids = [s13.id]
c6.study_set_ids = [s14.id, s15.id, s16.id]

u1.klass_ids = [c3.id, c4.id, c5.id, c6.id]
u2.klass_ids = [c1.id, c2.id, c5.id]
u3.klass_ids = [c1.id, c2.id, c3.id, c4.id]
u4.klass_ids = [c1.id, c2.id]

[s8, s9, s10, s11, s12, s13].each do |ss|
  3.times do
    u1.tests.new(study_set_id: ss.id, score: rand(0..10) * 10)
    u1.save!
  end
end

jp_students = (0..20).to_a.map do
  begin
    User.create!(username: Faker::Internet.user_name,
                 password: Faker::Internet.password,
                 email: Faker::Internet.email)
  rescue ActiveRecord::RecordInvalid => e
    retry
  end
end

i = 0
while i < jp_students.length
  student = jp_students[i]
  student.klass_ids = [c1.id, c2.id]
  [s1, s2, s3, s4, s5, s6, s7].each do |ss|
    rand(0..3).times do
      base = rand(0..7)
      student.tests.new(study_set_id: ss.id, score: (rand(0..3) + base) * 10)
    end
  end
  student.save!
  i += 1
end


sp_students = (0..20).to_a.map do
  begin
    User.create!(username: Faker::Internet.user_name,
                 password: Faker::Internet.password,
                 email: Faker::Internet.email)
  rescue ActiveRecord::RecordInvalid => e
    retry
  end
end

i = 0
while i < sp_students.length
  student = sp_students[i]
  student.klass_ids = [c3.id, c4.id]
  [s8, s9, s10, s11, s12].each do |ss|
    rand(0..3).times do
      base = rand(0..7)
      student.tests.new(study_set_id: ss.id, score: (rand(0..3) + base) * 10)
    end
  end
  student.save!
  i += 1
end



fr_students = (0..20).to_a.map do
  begin
    User.create!(username: Faker::Internet.user_name,
                 password: Faker::Internet.password,
                 email: Faker::Internet.email)
  rescue ActiveRecord::RecordInvalid => e
    retry
  end
end

i = 0
while i < fr_students.length
  student = fr_students[i]
  student.klass_ids = [c6.id]
  [s14, s15, s16].each do |ss|
    rand(0..3).times do
      base = rand(0..7)
      student.tests.new(study_set_id: ss.id, score: (rand(0..3) + base) * 10)
    end
  end
  student.save!
  i += 1
end
