class ModifyFlagsForApprovalPending < ActiveRecord::Migration
  def change
    add_column :flags, :pending_approval, :boolean
    remove_column :flags, :dev_selected
  end
end
