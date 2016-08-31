class AddScreenshotUrlToProjects < ActiveRecord::Migration
  def change
    remove_column :projects, :inspiration_links
    add_column :projects, :inspiration_link, :string
    add_column :projects, :screenshot_url, :string
  end
end
