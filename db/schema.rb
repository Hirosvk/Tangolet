# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160629231851) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "klasses", force: :cascade do |t|
    t.string   "name",        null: false
    t.text     "description"
    t.integer  "teacher_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "klasses", ["teacher_id"], name: "index_klasses_on_teacher_id", using: :btree

  create_table "study_set_words", force: :cascade do |t|
    t.integer  "study_set_id", null: false
    t.string   "word_english", null: false
    t.string   "word_foreign", null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "study_set_words", ["study_set_id", "word_english"], name: "index_study_set_words_on_study_set_id_and_word_english", unique: true, using: :btree
  add_index "study_set_words", ["study_set_id", "word_foreign"], name: "index_study_set_words_on_study_set_id_and_word_foreign", unique: true, using: :btree

  create_table "study_sets", force: :cascade do |t|
    t.string   "name",       null: false
    t.integer  "creator_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "study_sets", ["creator_id"], name: "index_study_sets_on_creator_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "email",           null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
