class UserList extends React.Component {
  render () {
    let list = [];
    let that = this;
    this.props.users.forEach(
      function(user){
        let status = 'inactive'
        if(that.props.action == 'newLie' && that.props.currentLies.includes(user.id)){
          status = 'lied'
        }
        if(that.props.action == 'newAnswer' && that.props.userAnswers.includes(user.id)){
          status = 'answered'
        }
        list.push(<User key={ user.id } data={ user } status={ status }/>)
      }
    )
    return <div>
      { this.props.users.length > 0 && <h2>Spielstand</h2> }
      <ul className='a-user-list'>
        { list }
      </ul>
      { this.props.users.length == 0 && <div className='a-notice'>Warten auf den ersten Spieler</div> }
    </div>;
  }
}
