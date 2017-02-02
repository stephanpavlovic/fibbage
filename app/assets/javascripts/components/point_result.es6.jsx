class PointResult extends React.Component {

  lies(){
    let lies = []
    let lieIndex = 1
    for (var key in this.props.lies) {
      let users = this.props.lies[key]
      if(users.length){
        let userElements = []
        users.forEach(function(user, index){
          userElements.push(<div key={index} className='a-lie--user' style={{animationDelay: (lieIndex*2+0.7) + 's'}}>{user}</div>)
        })
        lies.push(<div key={key} className='a-lie' style={{animationDelay: lieIndex*2 + 's'}}>
          <div className='a-lie--text'>{key}</div>
          <div className='a-lie--users'>
            { userElements }
          </div>
        </div>)
        lieIndex= lieIndex + 1 ;
      }
    }
    return lies
  }

  truth(){
    let users = [];
    let that = this;
    this.props.truth.forEach(function(user){
      users.push(<div key={user} className='a-lie--user' style={{animationDelay: that.props.users.length*2+0.7 + 's'}}>{ user }</div>)
    })
    let truth = <div className='a-lie as-truth' style={{animationDelay: that.props.users.length*2 + 's'}}>
      <div className='a-lie--text'>Wahrheit</div>
      <div className='a-lie--users'>
        {users}
      </div>
    </div>
    return truth
  }

  calculateUsers(users, lies, truth){
    console.log('calculateUsers', users)
    let userHash = {}
    return userHash;
  }


  render () {
    let users = this.calculateUsers(this.props.users, this.props.lies, this.props.truth)
    return <div className='a-result'>
      { this.props.lies && this.lies() }
      { this.props.truth && this.truth() }
    </div>;
  }
}
