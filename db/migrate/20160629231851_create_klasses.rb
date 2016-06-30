class CreateKlasses < ActiveRecord::Migration
  def change
    create_table :klasses do |t|
      t.string :name, null: false
      t.text :description
      t.integer :teacher_id

      t.timestamps null: false
    end
    add_index :klasses, :teacher_id
  end
end
