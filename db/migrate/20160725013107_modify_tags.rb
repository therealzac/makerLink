class ModifyTags < ActiveRecord::Migration
  def change
    create_join_table :projects, :tags do |t|
      t.index :tag_id
      t.index :project_id
    end
  end
end
