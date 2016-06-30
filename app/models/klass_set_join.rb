class KlassSetJoin < ActiveRecord::Base
  validates :klass, :study_set, presence: true
  validates :klass_id, uniqueness: { scope: :study_set_id }

  belongs_to :klass
  belongs_to :study_set

end
