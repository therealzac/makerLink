class CreateCohorts < ActiveRecord::Migration
  def change
    create_table :cohorts do |t|
      t.integer :school_id, null: false
      t.string :name, null: false
      t.date :project_completion_date, null: false
      t.timestamps null: false
    end
    add_index :cohorts, :school_id
  end
end
