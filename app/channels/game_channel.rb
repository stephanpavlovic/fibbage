class GameChannel < ApplicationCable::Channel

  @@lies = {}
  @@answers = {}

  def subscribed
    stream_from "game_#{params[:room]}"
  end

  def connect(data)
    unless User.find_by(token: data['token'])
      user = User.create(name: data['name'], token: data['token'])
      if !Game.find_by(code: params[:room])
        ActionCable.server.broadcast "game_#{params[:room]}", user: user.to_json, action: 'connect', room: params[:room]
      end
    end
  end

  def start(users)
    users = User.find(users["users"])
    game = Game.create(code: params[:room])
    users.each{|user|user.update_attributes(game_id: game.id)}
    questions = Question.limit(5).order("RANDOM()")
    ActionCable.server.broadcast "game_#{params[:room]}", action: 'start', questions: questions.map{|q| {id: q.id, name: q.category}}, user: users.sample.id, users: users.map(&:to_json)
  end

  def chooseQuestion(data)
    game = Game.find_by(code: params[:room])
    question = Question.find(data['question_id'])
    game.questions << question
    ActionCable.server.broadcast "game_#{params[:room]}", action: 'newQuestion', question: question.to_json
  end

  def lie(data)
    ActionCable.server.broadcast "game_#{params[:room]}", action: 'newLie', user: data['user_id']
    @@lies[data['user_id']] = data['text']
    game = Game.find_by(code: params[:room])
    if game.all_lied?(@@lies)
      ActionCable.server.broadcast "game_#{params[:room]}", action: 'liesComplete', answers: game.answers(@@lies).shuffle
    end
  end


  def answer(data)
    ActionCable.server.broadcast "game_#{params[:room]}", action: 'newAnswer', user: data['user_id']
    game = Game.find_by(code: params[:room])
    @@answers[data['user_id']] = data['text']
    if game.all_answered?(@@answers)
      ActionCable.server.broadcast "game_#{params[:room]}", action: 'answersComplete'
    end
  end

end
