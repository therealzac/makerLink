class AddCalendarIdToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :calendar_id, :string
  end
end
