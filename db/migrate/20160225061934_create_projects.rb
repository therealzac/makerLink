class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.integer :author_id, null: false
      t.integer :dev_id
      t.string :name, null: false
      t.string :pitch, null: false
      t.string :description, null: false
      t.string :url
      t.integer :view_count, null: false, default: 0
      t.date :expiration_date, null: false
      t.timestamps null: false
    end
    add_index :projects, :author_id
  end
end
