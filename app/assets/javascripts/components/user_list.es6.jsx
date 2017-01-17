class UserList extends React.Component {
  render () {
    let list = [];
    let that = this;
    this.props.users.forEach(
      function(user){
        list.push(<User key={ user } data={ user } active={ that.props.activeUser == user }/>)
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
