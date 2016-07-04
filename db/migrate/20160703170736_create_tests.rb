class CreateTests < ActiveRecord::Migration
  def change
    create_table :tests do |t|
      t.integer :user_id, null: false
      t.integer :study_set_id, null: false
      t.integer :score, null: false
      t.timestamps null: false
    end
    add_index :tests, :user_id
    add_index :tests, :study_set_id
  end
end
