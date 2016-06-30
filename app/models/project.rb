class Project < ActiveRecord::Base
  validates :name, :pitch, :description, :view_count, :expiration_date, presence: true
  belongs_to :author, class_name: "User"
  belongs_to :group
  has_many :tags
  has_many :tasks
  has_many :flags

  attr_accessor :flagged, :flag
end
