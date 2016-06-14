class Group < ActiveRecord::Base
  has_many :devs, class_name: "User"
  has_many :flags
  belongs_to :cohort
  has_one :school, through: :cohort, source: :school

  validates :name, presence: true

  def everyone_else_is_down?(project, dev)
    everyone_else = devs - [dev]

    everyone_else.all? do |dev|
      Flag.where("dev_id = #{dev.id} AND project_id = #{project.id}").any?
    end
  end
end
