class Test < ActiveRecord::Base
  validates :study_set, :user, presence: true
  belongs_to :study_set
  belongs_to :user

end
