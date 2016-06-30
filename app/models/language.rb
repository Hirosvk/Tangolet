class Language < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true
  has_many :study_sets
  has_many :klasses
end
