class CreateKlassSetJoins < ActiveRecord::Migration
  def change
    create_table :klass_set_joins do |t|
      t.integer :klass_id, null: false
      t.integer :study_set_id, null: false

      t.timestamps null: false
    end
    add_index :klass_set_joins, :klass_id
    add_index :klass_set_joins, :study_set_id
    add_index :klass_set_joins, [:klass_id, :study_set_id], unique: true
  end
end
