class CreateGames < ActiveRecord::Migration[5.0]
  def change
    create_table :games do |t|
      t.string :code
      t.json :users
      t.timestamps
    end

    add_index :games, :code, unique: true
  end
end
