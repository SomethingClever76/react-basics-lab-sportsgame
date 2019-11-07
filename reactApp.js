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

//CODE FOR MEDIUM MODE
// class Team extends React.Component {

//   constructor(props) {
//     super(props)

//     this.state = {
//       shots: 0,
//       score: 0,
//     }
//     this.goalSound = new Audio("assets/audio/crowdCheer.mp3")
//     this.shotSound = new Audio("assets/audio/onePersonCheer.mp3")
//   }

//   shotHandler = () => {
//     this.shotSound.play()
//     this.setState((state, props) => ({
//       shots: state.shots + 1
//     }))
//     if (Math.random() < .25) {
//       this.setState((state, props) => ({
//         score: state.score + 1
//       }))
//       this.goalSound.play()
//     }
//   }

//   render() {
//     let shotPercentage;
//     if (this.state.shots >= 1) {
//       shotPercentage = <div>Shot Percentage: {(this.state.score / this.state.shots * 100).toFixed(1)}%</div>
//     }
//     return <h1>Yay! I'm the {this.props.name}
//       <img width="100px" alt="team logo" src={this.props.logo}></img>
//       shots: {this.state.shots}
//       score: {this.state.score}
//       <button onClick={this.shotHandler}>Shoot</button>
//       {shotPercentage}
//     </h1>
//   }
// }

// class Game extends React.Component {
//   render() {
//     return (
//       <div className="kyle">
//         <h1>Welcome to {this.props.venue}</h1>
//         <Team name="Home Team" logo="https://i.ebayimg.com/images/g/IBAAAOSwxOFaeP8r/s-l300.jpg" />
//         <Team name="Away Team" logo="http://loodibee.com/wp-content/uploads/nfl-new-england-patriots-team-logo.png" />
//       </div>
//     )
//   }
// }

class Game extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      teamOne: { shots: 0, score: 0 },
      teamTwo: { shots: 0, score: 0 }
    }
    this.goalSound = new Audio("assets/audio/crowdCheer.mp3")
    this.shotSound = new Audio("assets/audio/onePersonCheer.mp3")
    this.venue = "LucasOil Stadium";
  };


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
  };

  shotPercentage = () => {
    if (this.state.shots >= 1) {
      this.shotPercentageData = <div>Shot Percentage: {(this.state.score / this.state.shots * 100).toFixed(1)}%</div>
    }
  };

  render() {
    let teamOneInfo = {
      name: "Colts",
      logo: <img src="assets/images/colts_logo"></img>
      // shotPercentage()
    }
    let teamTwoInfo = {
      name: "Patriots",
      logo: <img src="assets/images/patriots_logo"></img>
      // shotPercentage()
    }

    return (<div>
      <h1>Welcome to {this.venue}</h1>
      <h1>Yay! I'm the {teamOneInfo.name} {teamOneInfo.logo}
      <img width="100px" alt="team logo" src={this.props.logo}></img>
      shots: {this.state.shots}
      score: {this.state.score}
      <button onClick={this.shotHandler}>Shoot</button>
      {this.shotPercentageData}
    </h1></div>)
  }
};

function Team(props) {
  return (
    <h2>{props.name}</h2>
  )
}

// Default App component that all other components are rendered through
function App(props) {
  return (
    <div className="kyle">
      <Game/>
      <Team name="awesome team"/>
      {/* <Game venue = "LucasOil Stadium"/> */}
    </div>
  )
}

//Render the application
ReactDOM.render(
  <App />,
  document.getElementById('root')
);