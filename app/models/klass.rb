class Klass < ActiveRecord::Base
  validates :name, :teacher, :language, presence: true
  belongs_to :teacher,
    primary_key: :id,
    foreign_key: :teacher_id,
    class_name: "User"

  belongs_to :language

  has_many :klass_set_joins
  has_many :enrollments

  has_many :study_sets, through: :klass_set_joins
  has_many :students, through: :enrollments
end
