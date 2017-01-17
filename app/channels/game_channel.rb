class GameChannel < ApplicationCable::Channel

  def subscribed
    stream_from "game_#{params[:room]}"
  end

  def connect(data)
    if !Game.find_by(code: params[:room])
      ActionCable.server.broadcast "game_#{params[:room]}", name: data['name'], action: 'connect', room: params[:room]
    end
  end

  def start(users)
    user_data = {}
    users["users"].each{|u| user_data[u] = { points: 0, current_answer: '', current_lie: '' } }
    Game.create(code: params[:room], users: user_data)
    questions = Question.limit(5).order("RANDOM()")
    ActionCable.server.broadcast "game_#{params[:room]}", action: 'start', questions: questions.map{|q| {id: q.id, name: q.category}}, user: user_data.keys.sample, users: user_data
  end

  def chooseCategory(data)
    game = Game.find_by(code: params[:room])
    question = Question.find(data['question_id'])
    game.questions << question
    ActionCable.server.broadcast "game_#{params[:room]}", action: 'newQuestion', question: question.to_json
  end

  def lie(data)
    game = Game.find_by(code: params[:room])
    game.users[params['name']]['current_lie'] = data['text']
    game.save
    question = Question.find(data['question_id'])
    ActionCable.server.broadcast "game_#{params[:room]}", action: 'newAnswer', user: params['name']
    if game.all_lied?
      ActionCable.server.broadcast "game_#{params[:room]}", action: 'answersComplete', answers: game.answers(question)
    end
  end


  def answer(data)
    game = Game.find_by(code: params[:room])
    game.users[params['name']]['current_answer'] = data['text']
    game.save
    question = Question.find(data['question_id'])
    if game.all_lied?
      ActionCable.server.broadcast "game_#{params[:room]}", action: 'questionComplete'
      game.reset_question
    end
  end

end
