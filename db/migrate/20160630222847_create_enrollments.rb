class CreateEnrollments < ActiveRecord::Migration
  def change
    create_table :enrollments do |t|
      t.integer :klass_id, null: false
      t.integer :student_id, null: false

      t.timestamps null: false
    end
    add_index :enrollments, :klass_id
    add_index :enrollments, :student_id
    add_index :enrollments, [:klass_id, :student_id], unique: true
  end
end
