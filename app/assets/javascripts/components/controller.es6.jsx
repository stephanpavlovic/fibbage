class Controller extends React.Component {

  constructor() {
    super();
    this.state = {
      action: 'connect'
    };
  }

  handleReceivedData(data) {
    const action = data.action;
    if(action == 'connect'){
      let user = JSON.parse(data.user)
      if(this.state.token == user.token){
        this.setState({
          action: action,
          user: user
        })
      }
    }
    if(action == 'start'){
      this.setState({
        action: action,
        questions: data.questions,
        userForCategory: data.user
      })
    }
    if(action == 'newQuestion'){
      this.setState({
        action: action,
        currentQuestion: JSON.parse(data.question),
        userForCategory: data.user
      })
    }
    if(action == 'newLie'){
      this.setState({
        action: action,
        userForCategory: data.user
      })
    }
    if(action == 'liesComplete'){
      this.setState({
        action: action,
        currentAnswers: data.answers
      })
    }
    if(action == 'newAnswer'){
      this.setState({
        action: action,
        currentAnswers: data.answers
      })
    }
  }

  initConnection(code, name) {
    if (typeof App !== 'undefined'){
      const that = this;
      const token = Date.now()
      App.room = App.cable.subscriptions.create({ channel: "GameChannel", room: code }, {
        connected: function() {
          this.perform('connect', {name: name, token: token})
        },
        disconnected: function() {},
        received: function(data) {
          console.log('Controller Received', data.action, data)
          that.handleReceivedData(data)
        }
      });
      this.setState({
        room: App.room,
        token: token
      })
    }
  }

  chooseQuestion(questionId) {
    this.state.room.perform('chooseQuestion', {question_id: questionId})
  }

  submitLie(lie) {
    this.setState({lied: lie})
    this.state.room.perform('lie', {text: lie, user_id: this.state.user.id})
  }

  submitAnswer(answer){
    this.state.room.perform('answer', {text: answer, user_id: this.state.user.id})
  }

  render () {
    let screen = ''
    if(this.state.action == 'connect'){
      screen = <Join connect={ this.initConnection.bind(this) } user={ this.state.user }/>
    }
    if(this.state.action == 'start'){
      screen = <CategoryOptions questions={ this.state.questions } interactive={ this.state.userForCategory == this.state.user.id }  chooseQuestion={ this.chooseQuestion.bind(this) }/>
    }
    if(this.state.action == 'newQuestion' || this.state.action == 'newLie'){
      screen = <Lie question={ this.state.currentQuestion.question } submitLie={ this.submitLie.bind(this) }/>
    }
    if(this.state.action == 'liesComplete'){
      screen = <Question question={ this.state.currentQuestion.question } action={ this.state.action } answers={ this.state.currentAnswers } answered={this.submitAnswer.bind(this)}/>
    }
    return <div id='controller'>
      { screen }
    </div>;
  }
}
