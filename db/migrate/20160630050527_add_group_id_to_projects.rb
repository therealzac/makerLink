class AddGroupIdToProjects < ActiveRecord::Migration
  def change
    remove_column :projects, :dev_id
    add_column :projects, :group_id, :integer
  end
end
