class AddStudySetScoreIndex < ActiveRecord::Migration
  def change
    add_index :klasses, [:id, :teacher_id]  
  end
end
