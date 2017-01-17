class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      code: '',
      action: 'connect',
      userForCategory: '',
      questions: []
    };
  }

  handleReceivedData(data) {
    const action = data.action;
    if(action == 'connect'){
      this.setState({
        action: action,
        users:
      })
    }
    if(action == 'start'){
      this.setState({
        action: action,
        questions: data.questions
      })
    }
    if(action == 'newQuestion'){
      this.setState({
        action: action,
        currentQuestion: JSON.parse(data.question),
        userForCategory: data.user
      })
    }
    if(action == 'newAnswer'){
      this.setState({
        action: action,
        userForCategory: data.user
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
          console.log('Received', data, that)
          that.handleReceivedData(data)
        }
      });
      this.setState({
        room: App.room
      })
    }
  }

  allPlayersIn(){
    console.log("allPlayersIn", this.state.room)
    this.state.room.perform('start', { users: this.state.users })
  }

  render () {
    let screen = "";
    if(this.state.action == 'connect'){
      screen =<HomeJoin code={ this.props.code } userCount={ this.state.users.length } allPlayersIn={ this.allPlayersIn.bind(this) }/>
    }
    if(this.state.action == 'start'){
      screen = <CategoryOptions questions={ this.state.questions } user={ this.state.userForCategory }/>
    }
    if(this.state.action == 'newQuestion'){
      screen = <Question data={ this.state.currentQuestion } status={ this.state.action } />
    }
    return <div>
      { this.props.code && screen}
      <UserList users={ this.state.users } activeUser={ this.state.userForCategory }/>
    </div>;
  }
}
