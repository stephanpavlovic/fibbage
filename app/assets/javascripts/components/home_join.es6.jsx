class HomeJoin extends React.Component {
  render () {
    return <div id='join'>
      <h3>Gehe auf 'https://fibbage.herokuapp.com/controller' gib den folgenden Spielcode ein:</h3>
      <h1 className='a-code'> { this.props.code } </h1>
      { this.props.userCount > 0 && <button className='a-button' onClick= { this.props.allPlayersIn } >Spieler komplett</button> }

    </div>;
  }
}
