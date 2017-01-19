class Game < ApplicationRecord
  has_and_belongs_to_many :questions
  has_many :users

  def user_count
    users.count
  end

  def answers(lies)
    answers = lies.values + [current_question.answer] + current_question.wrong_answers
    answers.first(self.user_count < 4 ? 4 : self.user_count)
  end

  def all_lied?(lies)
    self.users.count == lies.count
  end

  def all_answered?(answers)
    self.users.count == answers.count
  end

  def calculate_points(lies, answers)
    points = { lies: {}, truth: [], user: {} }
    lies.each do |user, lie|
      points[:lies][lie] = []
      points[:user][user] = 0
    end
    answers.each do |user, user_answer|
      if(lies.values.include?(user_answer))
        points[:lies][user_answer] += [user]
        points[:user][lies.key(user_answer)] += 500
      elsif self.current_question.answer == user_answer
        points[:truth] += [user]
        points[:user][user] += 1000
      end
    end
    points[:user].each do |user_id, points|
      user = User.find(user_id)
      user.update_attribute(:points, user.points ? user.points + points : points)
    end
    points

  end

  def current_question
    self.questions.last
  end

end
