class Lie extends React.Component {

  constructor() {
    super();
    this.state = {
      lied: false
    };
  }

  handleSubmit(e){
    e.preventDefault();
    this.setState({lied: true})
    this.props.submitLie($(this.refs.lie).val())
  }

  render () {
    return <div className='a-question'>
      <div className='a-question--headline'>{ this.props.question }</div>
      { !this.state.lied && <form onSubmit={ this.handleSubmit.bind(this) }>
        <label>Deine Lüge</label>
        <input ref='lie' type='text' required='true'/>
        <button className='a-button'>Lüge abschicken</button>
      </form> }
      {
        this.state.lied && <div className='a-notice'>Warte auf die Lügen der anderen</div>
      }
    </div>;
  }
}
