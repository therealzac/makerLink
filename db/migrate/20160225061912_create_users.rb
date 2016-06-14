class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.integer :cohort_id
      t.integer :school_id
      t.integer :current_project_id
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :email, null: false
      t.string :mobile, null: false
      t.string :pic_url
      t.timestamps null: false
    end
    add_index :users, :email, unique: true
    add_index :users, :cohort_id
    add_index :users, :school_id
  end
end
