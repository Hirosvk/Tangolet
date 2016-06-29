class StudySetWord < ActiveRecord::Base
  validates :study_set, :word_foreign, :word_english, presence: true
  validates :word_english, uniqueness: { scope: :study_set_id }
  validates :word_foreign, uniqueness: { scope: :study_set_id }

  belongs_to :study_set, inverse_of: :words

end
