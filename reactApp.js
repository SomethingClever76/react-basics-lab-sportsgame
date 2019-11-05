class Team extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      shots: 0,
      score: 0,
    }
    this.goalSound = new Audio("assets/audio/crowdCheer.mp3")
    this.shotSound = new Audio("assets/audio/onePersonCheer.mp3")
  }

  shotHandler = () => {
    this.shotSound.play()
    this.setState((state, props) => ({
      shots: state.shots + 1
    }))
    if (Math.random() < .25) {
      this.setState((state, props) => ({
        score: state.score + 1
      }))
      this.goalSound.play()
    }
  }

  render() {
    let shotPercentage;
    if (this.state.shots >= 1) {
      shotPercentage = <div>Shot Percentage: {(this.state.score / this.state.shots * 100).toFixed(1)}%</div>
    }
    return <h1>Yay! I'm the {this.props.name}
      <img width="100px" alt="team logo" src={this.props.logo}></img>
      shots: {this.state.shots}
      score: {this.state.score}
      <button onClick={this.shotHandler}>Shoot</button>
      {shotPercentage}
    </h1>
  }
}

class Stadium extends React.Component {
  render() {
    return (
      <div className="kyle">
        <h1>Welcome to {this.props.venue}</h1>
        <Team name="Home Team" logo="https://i.ebayimg.com/images/g/IBAAAOSwxOFaeP8r/s-l300.jpg" />
        <Team name="Away Team" logo="http://loodibee.com/wp-content/uploads/nfl-new-england-patriots-team-logo.png" />
      </div>
    )
  }
}

// Default App component that all other components are rendered through
function App(props) {
  return (
    <div className="kyle">
      <Stadium venue="LucasOil Stadium"/>
    </div>
  )
}

//Render the application
ReactDOM.render(
  <App />,
  document.getElementById('root')
);