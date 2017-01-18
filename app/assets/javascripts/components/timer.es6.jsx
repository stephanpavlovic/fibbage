class Timer extends React.Component {

  constructor() {
    super();
    this.state = { updateMiliseconds: 100 }
  }

  componentWillMount() {
    this.setState({ seconds: this.props.seconds, progress: 0 })
  }

  componentDidMount() {
    let intervalId = setInterval(this.update.bind(this), this.state.updateMiliseconds)
    this.setState({intervalId: intervalId})
  }

  componentWillUnmount() {
    this.clear()
  }

  clear(){
    clearInterval(this.state.intervalId)
  }

  update(){
    if (this.state.progress > 99) {
      this.setState({progress: 100, intervalId: null})
      this.clear.bind(this)
    }
    else{
      let stepSize = 10*this.state.updateMiliseconds/(this.props.seconds*100)
      this.setState({progress: this.state.progress + stepSize})
    }
  }

  render () {
    return <div className='a-timer'>
      <div className='a-timer--counter' style={ {width: `${ this.state.progress}%`} }/>
    </div>;
  }
}
