class School < ActiveRecord::Base
  has_many :cohorts
  has_many :attendees, class_name: "User"
  validates :name, presence: true

  def admins
    self.attendees.where('cohort_id is NULL')
  end
end
