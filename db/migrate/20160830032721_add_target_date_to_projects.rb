class AddTargetDateToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :target_date, :string
  end
end
