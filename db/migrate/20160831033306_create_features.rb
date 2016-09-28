class CreateFeatures < ActiveRecord::Migration
  def change
    create_table :features do |t|
      t.integer :project_id, null: false
      t.string :value, null: false
      t.timestamps null: false
    end
  end
end
