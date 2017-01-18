class Game < ApplicationRecord
  has_and_belongs_to_many :questions
  has_many :users

  def user_count
    users.count
  end

  def answers(lies)
    question = self.questions.last
    answers = lies.values + [question.answer] + question.wrong_answers
    answers.first(self.user_count < 4 ? 4 : self.user_count)
  end

  def all_lied?(lies)
    self.users.count == lies.count
  end

  def all_answered?(answers)
    puts "########{answers.count}#########"
    self.users.count == answers.count
  end

end
