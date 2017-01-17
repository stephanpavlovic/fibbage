class CreateGamesQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :games_questions, index: false do |t|
      t.integer :game_id
      t.integer :question_id
    end
  end
end
