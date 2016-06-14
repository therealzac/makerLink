class AddCohortIdtoGroup < ActiveRecord::Migration
  def change
    add_column :groups, :cohort_id, :integer
  end
end
