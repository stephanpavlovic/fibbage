class CategoryOptions extends React.Component {
  render () {
    let categoryList = [];
    this.props.questions.forEach(
      function(question, index){
        categoryList.push(<div key={ index }>{ question.category }</div>)
      }
    )
    return <div>
      <h2>Zur Auswahl für die Frage stehen:</h2>
      { categoryList }
      <p>
        { `Es wählt ${this.props.user}` }
      </p>
    </div>;
  }
}
