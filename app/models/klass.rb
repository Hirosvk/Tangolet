class Klass < ActiveRecord::Base
  validates :name, :teacher, :language, presence: true
  belongs_to :teacher,
    primary_key: :id,
    foreign_key: :teacher_id,
    class_name: "User"

  belongs_to :language
end
