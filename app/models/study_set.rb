class StudySet < ActiveRecord::Base
  validates :name, :creator, :words, presence: true

  has_many :words,
    primary_key: :id,
    foreign_key: :study_set_id,
    class_name: "StudySetWord",
    dependent: :destroy,
    inverse_of: :study_set

  belongs_to :creator,
    primary_key: :id,
    foreign_key: :creator_id,
    class_name: "User"


end
