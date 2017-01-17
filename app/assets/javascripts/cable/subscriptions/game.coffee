window.SGE = {}

$(document).on "turbolinks:load.appearance", =>
  if false#($('#userList').length)
    window.generalGame = App.cable.subscriptions.create { channel: "GameChannel", room: $('#userList').data('code')},
      received: (data) ->
        console.log('General Receive', data)
        if data.action == 'connect'
          if(!$('#start').length)
            $('#userList').before('<button id="start">Spieler vollständig</button>')
          $('#userList')
            .append("<li data-name=#{data.name}>#{data.name}</li>")
            .data('users', $('#userList').data('users').concat(data.name))
        if data.action == 'start'
          $('#start, #toJoin').hide();
          options = '<h2>Folgende Kategorien stehen zur Auswahl</h2>'
          $.each data.questions, (index, question) ->
            options += '<div class="category-option" data-id=' + question.id + '>' + question.name + '</div>'
          $('#categories').html(options)
        if data.action == 'newQuestion'
          question = JSON.parse(data.question)
          $('#categories').hide();
          $('#question').show().attr('data-id', question.id);
          $('#question .category').text(question.category)
          $('#question .text').text(question.question)
        if data.action == 'newAnswer'
          $("#userList [data-name=#{data.user}]").addClass('with-lie')

        if data.action == 'answersComplete'
          $.each data.answers, (index, answer) ->
            $('#answers').append("<li data-value=#{answer[1]}>#{answer[1]}</li>")
        if data.action == 'questionComplete'
          $('#game #answers').hide()
      start: ->
        @perform 'start', users: $('#userList').data('users')
    $("#game").on 'click', '#start', ->
      window.generalGame.start()

  $("#controller").on 'click', '.category-option.as-interactive', ->
    window.controller.chooseCategory($(@).data('id'))

  $('#lie').on 'submit', (e) ->
    e.preventDefault()
    lie = $('#lie').find('#lie').val()
    questionId = $('#question').data('id')
    window.controller.setLie(lie, questionId )

  $('#controller').on 'click', '#answers li', ->
    answer = $(@).data('value')
    question = $('#question').data('id')
    window.controller.setAnswer(answer, question)

  $('#join').on 'submit', (e) ->
    e.preventDefault()
    code = $('#join').find('#code').val()
    name = $('#join').find('#name').val()
    window.controller = new SGE.Subscription(code, name).init()

class SGE.Subscription
  constructor: (roomCode, name) ->
    @roomCode = roomCode
    @name = name
  init: ->
    App.cable.subscriptions.create { channel: "GameChannel", room: @roomCode, name: @name },
      connected: ->
        name = $('#join').find('#name').val()
        $('#controller').attr('data-name', name)
        @perform 'connect', name: name
      received: (data) ->
        console.log('Controller Receive', data)
        if data.action == 'connect'
          $("#joining").hide()
          $('#message').html("<h2>Auf die restlichen Spieler für Spiel #{data.room} warten</h2>")
        if data.action == 'start'
          if($('#controller').data('name') == data.user)
            $('#message').html("<h2>Wähle eine Kategorie</h2>")
            options = ''
            $.each data.questions, (index, question) ->
              options += '<div class="category-option as-interactive" data-id=' + question.id + '>' + question.name + '</div>'
            $('#chooseCategory').html(options)
          else
            $('#message').html("<h2>Spiel startet, #{data.user} wählt eine Kategorie</h2>")
        if data.action == 'newQuestion'
          $('#chooseCategory').hide()
          question = JSON.parse(data.question)
          $('#question')
            .show()
            .attr('data-id', question.id)
          $('#message').text(question.question)
        if data.action == 'newAnswer'
          if $('#controller').attr('data-name') == data.user
            $('#lie').hide()
        if data.action == 'answersComplete'
          $.each data.answers, (index, answer) ->
            if answer[0] != $('#controller').attr('data-name')
              $('#answers').append("<li data-value=#{answer[1]}>#{answer[1]}</li>")
        if data.action == 'questionComplete'
          $('#controller #answers').hide()
      chooseCategory: (questionId) ->
        @perform 'chooseCategory', question_id: questionId
      setLie: (text, questionId) ->
        @perform 'lie', text: text, question_id: questionId
      setAnswer: (text, questionId) ->
        @perform 'answer', text: text, question_id: questionId
