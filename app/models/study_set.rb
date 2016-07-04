class StudySet < ActiveRecord::Base
  validates :name, :creator, :words, :language, presence: true
  validate :check_unique

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

  belongs_to :language

  has_many :klass_set_joins

  has_many :klasses, through: :klass_set_joins

  has_many :tests

  private
  def check_unique
    if self.words.map{|word| word[:word_english]}.uniq.length != self.words.length
      errors[:base] << "Every word has to be unique"
    end
  end

end
