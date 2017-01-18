class UserList extends React.Component {
  render () {
    let list = [];
    let that = this;
    console.log('Render UserList', that.props.currentLies)
    this.props.users.forEach(
      function(user){
        let status = 'inactive'
        if(that.props.action == 'newLie' && that.props.currentLies.includes(user.id)){
          status = 'lied'
        }
        if(that.props.action == 'newAnswer' && that.props.currentAnswers.includes(user.id)){
          status = 'answered'
        }
        list.push(<User key={ user.id } data={ user } active={ that.props.activeUser == user.id } status={ status }/>)
      }
    )
    return <div>
      { this.props.users.length > 0 &&  <h2>Aktuelle User</h2> }
      <ul>
        { list }
      </ul>
    </div>;
  }
}
