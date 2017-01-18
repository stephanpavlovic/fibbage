class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :name
      t.integer :points
      t.integer :game_id

      t.timestamps
    end
    remove_column :games, :users
  end
end
