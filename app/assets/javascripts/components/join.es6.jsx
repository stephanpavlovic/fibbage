class Join extends React.Component {

  submit(e){
    e.preventDefault();
    this.props.connect($(this.refs.code).val(), $(this.refs.name).val())
  }

  render () {
    return <div>
      { !this.props.user && <div><h1>Bei einem Spiel mitmachen</h1>
      <form onSubmit={ this.submit.bind(this) }>
        <label>Code</label>
        <input type="text" ref='code' required='true'/>
        <br/>
        <label>Dein Name</label>
        <input type="text" ref='name' required='true'/>
        <button className='a-button'>Teilnehmen</button>
      </form></div> }
      { this.props.user && <div>
          <h2>Hallo { this.props.user.name }</h2>
          <h3>Warte auf die restlichen Spieler</h3>
        </div>
       }
    </div>;
  }
}
