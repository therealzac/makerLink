class ModifyProjects < ActiveRecord::Migration
  def change
    remove_column :projects, :pitch
    remove_column :projects, :view_count
    remove_column :projects, :expiration_date
    add_column :projects, :youtube_link, :string
    add_column :projects, :inspiration_link, :string
    add_column :projects, :involvement_level, :integer
  end
end