class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.integer :project_id, null: false
      t.string :value, null: false
      t.timestamps null: false
    end
    add_index :tags, :project_id
  end
end
