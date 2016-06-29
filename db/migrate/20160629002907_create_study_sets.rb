class CreateStudySets < ActiveRecord::Migration
  def change
    create_table :study_sets do |t|
      t.string :name, null: false
      t.integer :creator_id, null: false
      t.timestamps null: false
    end
    add_index :study_sets, :creator_id 
  end
end
