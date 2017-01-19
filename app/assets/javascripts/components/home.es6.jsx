class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      code: '',
      action: 'connect',
      userForCategory: '',
      questions: [],
      questionCount: 0,
      currentLies: [],
      currentAnswers: [],
      userAnswers: []
    };
  }

  handleReceivedData(data) {
    const action = data.action;
    if(action == 'connect'){
      this.setState({
        action: action,
        users: this.state.users.concat(JSON.parse(data.user))
      })
    }
    if(action == 'start'){
      let newUsers = []
      let activeUser = null
      data.users.forEach(function(user){
        let userData = JSON.parse(user)
        newUsers.push(userData)
        if(userData.id == data.user){
          activeUser = userData.name
        }
      })
      this.setState({
        action: action,
        users: newUsers,
        questions: data.questions,
        userForCategory: activeUser,
        userForCategoryId: data.user
      })
    }
    if(action == 'newQuestion'){
      this.setState({
        action: action,
        currentQuestion: JSON.parse(data.question),
        questionCount: this.state.questionCount + 1,
        userForCategory: data.user,
        currentLies: [],
        currentAnswers: null
      })
    }
    if(action == 'newLie'){
      this.setState({
        action: action,
        currentLies: this.state.currentLies.concat(data.user).sort()
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
        userAnswers: this.state.userAnswers.concat(data.user).sort()
      })
    }
    if(action == 'answersComplete'){
      this.setState({
        action: action,
        users: JSON.parse(data.users),
        currentPoints: data.points
      })
    }

  }

  componentWillMount() {
    if (typeof App !== 'undefined'){
      const that = this;
      App.room = App.cable.subscriptions.create({ channel: "GameChannel", room: this.props.code }, {
        connected: function() {},
        disconnected: function() {},
        received: function(data) {
          console.log('Game Received', data)
          that.handleReceivedData(data)
        }
      });
      this.setState({
        room: App.room
      })
    }
  }

  allPlayersIn(){
    let userIds = []
    this.state.users.forEach(function(user){
      userIds.push(user.id)
    })
    this.state.room.perform('start', { users: userIds })
  }

  timerComplete(){
    this.state.room.perform('complete', {})
  }

  render () {
    let screen = this.state.currentQuestion ? <Question question={ this.state.currentQuestion.question } showHint={this.state.questionCount == 1 && this.state.action == 'newQuestion'} action={ this.state.action } answers={ this.state.currentAnswers } timerComplete={ this.timerComplete.bind(this) }/> : ''

    if(this.state.action == 'connect'){
      screen =<HomeJoin code={ this.props.code } userCount={ this.state.users.length } allPlayersIn={ this.allPlayersIn.bind(this) }/>
    }
    if(this.state.action == 'start'){
      screen = <CategoryOptions questions={ this.state.questions } user={ this.state.userForCategory }/>
    }

    if(this.state.action == 'answersComplete'){
      screen = <Points nextQuestion={ this.allPlayersIn.bind(this) }/>
    }
    console.log('HomeRender', this.state.action, this.state.questionCount)
    return <div className='b-layout'>
      { this.props.code && <div className='b-layout--main'> { screen }</div>}
      <div className='b-layout--user-list'><UserList users={ this.state.users } activeUser={ this.state.userForCategory } currentLies={ this.state.currentLies } userAnswers={this.state.userAnswers} action={ this.state.action }/></div>
    </div>;
  }
}
