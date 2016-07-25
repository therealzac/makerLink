class Project < ActiveRecord::Base
  validates :name, :description, presence: true
  belongs_to :author, class_name: "User"
  belongs_to :group
  has_and_belongs_to_many :tags
  has_many :tasks
  has_many :flags

  attr_accessor :flagged, :flag
end
