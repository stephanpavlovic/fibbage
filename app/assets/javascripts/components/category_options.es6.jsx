class CategoryOptions extends React.Component {

  render () {
    let categoryList = [];
    const that = this;
    this.props.questions.forEach(
      function(question, index){
        let item = <div key={ index } className='category-option'>{ question.name }</div>
        if(that.props.interactive){
          item = <div key={ index } onClick={ () => that.props.chooseQuestion(question.id) } className='category-option as-interactive'>{ question.name }</div>
        }
        categoryList.push(item)
      }
    )
    let headline = 'Zur Auswahl für die nächste Frage stehen:'
    if(this.props.interactive){
      headline = 'Du wählst eine Kategorie'
    }
    return <div>
      <h3>{ headline }</h3>
      { categoryList }
      <p>
        { this.props.user && `Es wählt ${this.props.user}` }
      </p>
    </div>;
  }
}
