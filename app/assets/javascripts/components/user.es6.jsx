class User extends React.Component {
  render () {
    return <div className={ `a-user as-${this.props.status}` }>
      <div className='a-user--name'>
        { this.props.data.name }
      </div>
      <div className='a-user--points'>
        { this.props.data.points || 0 }
        { ' Punkte' }
      </div>
    </div>;
  }
}
