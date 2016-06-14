class AddSchoolIdToFlags < ActiveRecord::Migration
  def change
    add_column :flags, :school_id, :integer, null: false
  end
end
