class Game < ApplicationRecord
  has_and_belongs_to_many :questions

  def user_count
    users&.keys&.count
  end

  def answers(question)
    lies = self.users.map{|k,v| [k,v['current_lie']]}
    lies += question.wrong_answers.map.with_index{|a,i| ["wrong#{i}", a]}
    lies.first(self.user_count < 4 ? 4 : self.user_count)
  end

  def all_lied?
    self.users.select{|n,u| !u['current_lie'].present?}.empty?
  end

  def all_answered?
    self.users.select{|n,u| !u['current_answer'].present?}.empty?
  end

  def reset_question
    data = {}
    self.users.each do |user, values|
      data[user] = values
      data[user]['current_lie'] = ''
      data[user]['current_answer'] = ''
    end
    self.users = data
    self.save
  end
end
