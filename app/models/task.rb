class Task < ActiveRecord::Base
  belongs_to :author, class_name: "User"
  belongs_to :project
  validates :body, presence: true
  validates :status, presence: true
end
