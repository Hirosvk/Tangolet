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


# NUM_OF_KLASSES = <<-SQL
#   SELECT
#     languages.id AS id,
#     COUNT(klasses.id) AS num
#   FROM
#     languages JOIN klasses
#     ON languages.id = klasses.language_id
#   WHERE
#     languages.id = 1
#   GROUP BY
#     languages.id
# SQL
#
# NUM_OF_STUDYSETS = <<-SQL
#   SELECT
#     COUNT(study_sets.id) AS num
#   FROM
#     languages JOIN study_sets
#     ON languages.id = study_sets.language_id
#   WHERE
#     languages.id = 2
#   GROUP BY
#     languages.id
# SQL

end
