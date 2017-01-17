class CreateQuestions < ActiveRecord::Migration[5.0]
  def change
    create_table :questions do |t|
      t.string :question
      t.string :answer
      t.text :wrong_answers, array: :true
      t.string :category
      t.timestamps
    end
  end
end
