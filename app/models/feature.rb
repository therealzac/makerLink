class Feature < ActiveRecord::Base
  validates :project_id, :value, presence: true
  belongs_to :project
end
