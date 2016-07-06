class Language < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  has_many :study_sets
  has_many :klasses

  def num_of_klasses
    self.klasses.count
  end

  def num_of_study_sets
    self.study_sets.count
  end

end
