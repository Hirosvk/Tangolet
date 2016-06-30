class AddLanguageColumns < ActiveRecord::Migration
  def change
    add_column :study_sets, :language_id, :integer
    add_column :klasses, :language_id, :integer
  end
end
