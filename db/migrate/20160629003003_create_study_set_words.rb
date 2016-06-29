class CreateStudySetWords < ActiveRecord::Migration
  def change
    create_table :study_set_words do |t|
      t.integer :study_set_id, null: false
      t.string :word_english, null: false
      t.string :word_foreign, null: false

      t.timestamps null: false
    end
    add_index :study_set_words, [:study_set_id, :word_english], :unique => true
    add_index :study_set_words, [:study_set_id, :word_foreign], :unique => true
    
  end
end
