class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.integer :author_id, null: false
      t.integer :project_id, null: false
      t.string :body, null: false
      t.string :status, null: false, default: 'todo'
      t.timestamps null: false
    end
    add_index :tasks, :project_id
  end
end
