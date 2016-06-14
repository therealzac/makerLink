class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.integer :author_id, null: false
      t.integer :recipient_id, null: false
      t.string :body, null: false
      t.boolean :is_sent, null: false, default: false
      t.boolean :is_trash, null: false, default: false
      t.timestamps null: false
    end
    add_index :messages, :author_id
    add_index :messages, :recipient_id
  end
end
