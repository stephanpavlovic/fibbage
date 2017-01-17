class User extends React.Component {
  render () {
    return <div className={ `a-user ${this.props.active && 'as-active'}` }>
      <div className='a-user--name'>
        { this.props.data }
      </div>
    </div>;
  }
}
