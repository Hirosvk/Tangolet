class Enrollment < ActiveRecord::Base
  validates :klass, :student, :presence => true
  validates :klass_id, uniqueness: { scope: :student_id }

  belongs_to :klass
  belongs_to :student,
    primary_key: :id,
    foreign_key: :student_id,
    class_name: "User"
end
