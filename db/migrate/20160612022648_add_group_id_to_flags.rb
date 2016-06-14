class AddGroupIdToFlags < ActiveRecord::Migration
  def change
    add_column :flags, :group_id, :integer, null: false
  end
end
