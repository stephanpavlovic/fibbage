class Question extends React.Component {
  render () {

    let answers = []
    if(this.props.answers){
      const that = this;
      this.props.answers.forEach(function(answer, index){
        if(that.props.answered){
          answers.push(<li key={index} onClick={that.props.answered.bind(this, answer)} className='a-question--answer as-interactive'>{ answer }</li>)
        }else{
          answers.push(<li key={index} className='a-question--answer'>{ answer }</li>)
        }
      })
    };

    return <div className='a-question'>
      <div className='a-question--headline'>{ this.props.question }</div>
      { !this.props.answered && this.props.action != 'liesComplete' && <Timer seconds={ 30 }/> }
      {
        this.props.answers && <ul className='a-question--answers'>{ answers }</ul>
      }
    </div>;
  }
}
