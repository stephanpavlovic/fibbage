class User extends React.Component {
  render () {
    return <div className={ `a-user ${this.props.active && 'as-active'} as-${this.props.status}` }>
      <div className='a-user--name'>
        { this.props.data.name }
      </div>
      <div className='a-user--points'>
        { this.props.data.id }
      </div>
    </div>;
  }
}
