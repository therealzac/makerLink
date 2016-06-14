class Flag < ActiveRecord::Base
  belongs_to :dev, class_name: "User"
  belongs_to :project
  belongs_to :group
  belongs_to :school
end
