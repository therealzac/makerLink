class RemoveNullContraintsFromFlags < ActiveRecord::Migration
  def change
    remove_column :flags, :dev_selected
    remove_column :flags, :customer_paid
    remove_column :flags, :instructor_approved
    add_column :flags, :instructor_approved, :boolean
    add_column :flags, :dev_selected, :boolean
    add_column :flags, :customer_paid, :boolean
  end
end
