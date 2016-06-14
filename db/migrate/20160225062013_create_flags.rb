class CreateFlags < ActiveRecord::Migration
  def change
    create_table :flags do |t|
      t.integer :dev_id, null: false
      t.integer :project_id, null: false
      t.boolean :instructor_approved, null: false, default: false
      t.boolean :dev_selected, null: false, default: false
      t.boolean :customer_paid, null: false, default: false
      t.timestamps null: false
    end
    add_index :flags, :dev_id
    add_index :flags, :project_id
  end
end
