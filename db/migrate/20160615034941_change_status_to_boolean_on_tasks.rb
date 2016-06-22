class ChangeStatusToBooleanOnTasks < ActiveRecord::Migration
  def change
    remove_column :tasks, :status
    add_column :tasks, :status, :integer, null: false, default: 0
  end
end
