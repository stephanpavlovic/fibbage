class Points extends React.Component {

  constructor() {
    super();
    // this.props.nextQuestion
    this.state = {
      showButton: false
    };
  }

  componentWillMount() {
    if(this.props.points){
      this.setState({
        lies: this.props.points.lies,
        currentLie: this.props.points.lies[0],
        truth: this.props.points.truth,
        users: this.props.points.user,
        showButton: this.props.nextQuestion
      })
    }
  }

  render () {
    return <div>
      { this.state.showButton && <button className='a-button' onClick={this.props.nextQuestion}>Nächste Frage</button> }
      <PointResult lies={ this.state.lies } truth={ this.state.truth } users={ this.props.users }/>
      { this.props.origin == 'controller' && <UserList users={ this.props.users } currentLies={ [] } userAnswers={ [] } action={ '' }/> }
    </div>;
  }
}
