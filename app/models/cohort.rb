class Cohort < ActiveRecord::Base
  has_many :devs, class_name: 'User'
  has_many :groups
  has_many :flags, through: :devs
  belongs_to :school
  has_many :admins, through: :school, source: :admins
  validates :name, presence: true
  validates :project_completion_date, presence: true

  def solo_devs
    self.devs.select { |dev| !dev.group_id }
  end
end
