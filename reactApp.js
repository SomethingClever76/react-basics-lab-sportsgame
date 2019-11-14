//HARD MODE
// Hard mode is not required and is to challenge you on concepts related to state. 
// In hard mode, we want to modify the Game component to be the source of the truth
// for the games state. The Game component should keep track of how the game is played
// and it's progress. Currently, most of this is tracked in our Team component. 
// Our game component will manage 2 teams, home and visiting, and their stats during
// the game. To accomplish this we will be converting our Team component to a 
// stateless functional component and having the stateful Game component pass the 
// data to the teams as props. This is concept is called Lifting State Up. We are 
// sharing state with all the components concerned by moving it up to the closest 
// common ancestor of the components that rely on it.

// 1. Convert the Team component to a functional stateless component.
// Everything that relied on state before inside the Team component should now rely 
// on passed in props from the Game component.
//
// 2. Update the Game component to keep track of the home and visiting team stats and
// pass that data to the Team component as props.
//
// 3. Since all the game data will be tracked by the Game components state, the method 
// used when clicking the shoot button for a team should also be passed in as a prop. 
// This method needs to affect state in the right component.
//
// 4. Add a Reset Game button to the Game and a counter displaying the number of resets.
// When the reset button is pressed the team stats should reset and the reset counter
// should increase by 1

class Game extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      teamOne: {
        shots: 0,
        score: 0
      },
      teamTwo: {
        shots: 0,
        score: 0
      }
    }

    this.shotSound = new Audio("assets/audio/onePersonCheer.mp3")
    this.scoreSound = new Audio("assets/audio/crowdCheer.mp3")
  };

  shoot = (team) => {
    const teamStatsKey = `${team}`
    //here is where you pulled the score out for the correct team
    let score = this.state[teamStatsKey].score
    this.shotSound.play()

    if (Math.random() < .25) {
      
      // this.setState((state, props) => ({
      //   score: state.score + 1
      // }))
      //here is where we updating the scor fore the team that we grabbed on line 50
      score = score + 1
      this.scoreSound.play()
    }

     //this is where you are updating state (shots and score) just once
    this.setState((state, props) => ({
      [teamStatsKey]: {
        shots: state[teamStatsKey].shots + 1,
        score
      }
    }))
  };

  render() {
    return (
      <div className="Game">
        <h1>Welcome to {this.props.venue}</h1>
        <div className="Teams">
          <h1>Yay! I'm the <Team
            name={this.props.teamOne.name}
            logo={this.props.teamOne.logo}
            stats={this.state.teamOne}
            shotHandler={() => this.shoot("teamOne")}
          />
          </h1>

          <h1>Yay! I'm the <Team
            name={this.props.teamTwo.name}
            logo={this.props.teamTwo.logo}
            stats={this.state.teamTwo}
            shotHandler={() => this.shoot("teamTwo")}
          />
          </h1>
        </div>
      </div>)
  }
};

function Team(props) {
  let shotPercentage;

  if (props.stats.shots >= 1) {
    shotPercentage = <div>Shot Percentage: {(props.stats.score / props.stats.shots * 100).toFixed(1)}%</div>
  }

  return (
    <div className="team">
       {props.name}
      
      <div className="logo">
        <img src={props.logo} width="100px" alt={props.name} />
      </div>
      
      <div>
        shots: {props.stats.shots}
      </div>
      
      <div>
        score: {props.stats.score}
      </div>
      
      {shotPercentage}
      
      <button onClick={props.shotHandler}>Shoot</button>
    </div>
  )
}

//***Default App component that all other components are rendered through
function App(props) {
  const colts = {
    name: "Colts",
    logo: "assets/images/colts_logo.jpg"
  }

  const patriots = {
    name: "Patriots",
    logo: "assets/images/patriots_logo.png"
  }

  return (
    <div className="App">
      <Game 
      venue="LucasOil Stadium"
      teamOne={colts}
      teamTwo={patriots}
      />
    </div>
  )
}

//Render the application
ReactDOM.render(
  <App />,
  document.getElementById('root')
);