class AddSlackIdToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :slack_id, :string
  end
end
