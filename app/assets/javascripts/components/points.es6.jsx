class Points extends React.Component {
  render () {
    return <div>
      { this.props.nextQuestion && <button className='a-button' onClick={this.props.nextQuestion}>Nächste Frage</button> }
      { this.props.users && <UserList users={ this.props.users } currentLies={ [] } userAnswers={ [] } action={ '' }/> }
    </div>;
  }
}
