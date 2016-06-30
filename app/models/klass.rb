class Klass < ActiveRecord::Base
  validates :name, :teacher, presence: true
  belongs_to :teacher,
    primary_key: :id,
    foreign_key: :teacher_id,
    class_name: "User"
end
