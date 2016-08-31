class MakeTagsUniqueAgain < ActiveRecord::Migration
  def change
    add_index "tags", ["value", "project_id"], unique: true
  end
end
