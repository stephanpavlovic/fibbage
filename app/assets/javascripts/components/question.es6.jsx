class Question extends React.Component {
  render () {

    let answers = []
    if(this.props.answers){
      const that = this;
      this.props.answers.forEach(function(answer, index){
        if(that.props.answered){
          if(answer != that.props.lie){
            answers.push(<li key={index} onClick={that.props.answered.bind(this, answer)} className='a-question--answer as-interactive'>{ answer }</li>)
          }
        }else{
          answers.push(<li key={index} className='a-question--answer'>{ answer }</li>)
        }
      })
    };

    return <div className='a-question'>

      <div className='a-question--headline'>{ this.props.question }</div>
      { !this.props.answered && this.props.action != 'liesComplete' && this.props.action != 'newAnswer' && <div>
          { this.props.showHint && <div className='a-notice'>
            "Alle Spieler haben 30 Sekunden um sich eine Lüge zu der Frage auszudenken"
          </div> }
          <Timer seconds={ 30 } complete={ this.props.timerComplete }/>
        </div>
      }
      {
        this.props.answers && this.props.action != 'newAnswer' && <ul className='a-question--answers'>{ answers }</ul>
      }
    </div>;
  }
}
