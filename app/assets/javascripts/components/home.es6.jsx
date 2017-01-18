class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      code: '',
      action: 'connect',
      userForCategory: '',
      questions: [],
      currentLies: [],
      currentAnswers: []
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
        userAnswers: this.state.currentAnswers.concat(data.user).sort()
      })
    }
    if(action == 'answersComplete'){
      this.setState({
        action: action
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

  render () {
    let screen = this.state.currentQuestion ? <Question question={ this.state.currentQuestion.question } action={ this.state.action } answers={ this.state.currentAnswers } /> : ''

    if(this.state.action == 'connect'){
      screen =<HomeJoin code={ this.props.code } userCount={ this.state.users.length } allPlayersIn={ this.allPlayersIn.bind(this) }/>
    }
    if(this.state.action == 'start'){
      screen = <CategoryOptions questions={ this.state.questions } user={ this.state.userForCategory }/>
    }

    if(this.state.action == 'answersComplete'){
      screen = <Points/>
    }

    return <div>
      { this.props.code && screen}
      <UserList users={ this.state.users } activeUser={ this.state.userForCategory } currentLies={ this.state.currentLies } currentAnswers={this.state.currentAnswers} action={ this.state.action }/>
    </div>;
  }
}
