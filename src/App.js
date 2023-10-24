
import './App.css';
import { useState, useEffect } from "react"
import $ from "jquery"
const objects = [
  {
      first: "max",
      name: "verstappen",
      elo: 1,
      team: "#3671C6"
  },
  {
      first: "lewis",
      name: "hamilton",
      elo: 1,
      team: "#6CD3BF"
  },
  {
      first: "fernando",
      name: "alonso",
      elo: 1,
      team: "#358C75"
  },
  {
      first: "daniel",
      name: "ricciardo",
      elo: 1,
      team: "#5E8FAA"
  },
  {
      first: "kevin",
      name: "magnussen",
      elo: 1,
      team: "#B6BABD"
  },
  { 
      first: "alex",
      name: "albon",
      elo: 1,
      team: "#37BEDD"
  },
  {
      first: "sergio",
      name: "perez",
      elo: 1,
      team: "#3671C6"
  },
  {
      first: "valterri",
      name: "bottas",
      elo: 1,
      team: "#C92D4B"
  },
  {
      first: "guanyu",
      name: "zhou",
      elo: 1,
      team: "#C92D4B"
  },
  {
      first: "yuki",
      name: "tsunoda",
      elo: 1,
      team: "#5E8FAA"
  },
  {
      first: "george",
      name: "russell",
      elo: 1,
      team: "#6CD3BF"
  },
  {
      first: "logan",
      name: "sargeant",
      elo: 1,
      team: "#37BEDD"
  },
  {
      first: "charles",
      name: "leclerc",
      elo: 1,
      team: "#F91536"
  },
  {
      first: "carlos",
      name: "sainz",
      elo: 1,
      team: "#F91536"
  },
  {
      first: "nico",
      name: "hulkenberg",
      elo: 1,
      team: "#B6BABD"
  },
  {
      first: "lando",
      name: "norris",
      elo: 1,
      team: "#F58020"
  },
  {
      first: "oscar",
      name: "piastri",
      elo: 1,
      team: "#F58020"
  },
  {
      first: "pierre",
      name: "gasly",
      elo: 1,
      team: "#2293D1"
  },
  {
      first: "esteban",
      name: "ocon",
      elo: 1,
      team: "#2293D1"
  },
  {
      first: "lance",
      name: "stroll",
      elo: 1,
      team: "#358C75"
  },
]

const history = []
var counter = 1

function App() {

  const [currentMatchup, setCurrentMatchup] = useState([])
  const [done, setDone] = useState(true)
  var matchupElements, finalElements, finalTable
  var counts = []

  function handlePick(e){
    console.log($(e.target).parent().siblings()[0].children[0])
    $(e.target).parent().siblings()[0].children[0].style.filter = "sepia(1)"
    setTimeout(() => {
      for(var i = 0; i < objects.length; i++){
        if(objects[i].name == e.target.id){
          objects[i].elo += 1
          counter += 1
          history.push({matchup: currentMatchup, winner: objects[i].name})
        }
      }
      countMatches()
      if(counts.length-1 !== objects.length){
        $(e.target).parent().siblings()[0].children[0].style.filter = "sepia(0)"
        getMatchup()
      } else {
        setDone(true)
      }
    }, 500)

  }
  
  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  
  function getMatchup() {
    var result = []
    for(var i = 1; i < counts.length; i++){
        var queue = ""
        if(counts[i] > 1) {
            shuffle(objects).map(obj => {
                if(obj.elo == i){
                    if(queue == []){
                        queue = obj.name
                    } else {
                        result.push([obj.name, queue])
                        queue = ""
                    }
                }
            })
        }
    }
    const repeats = []
    const newMatches = []
    if(!history[0]){
      setCurrentMatchup(shuffle(result)[0])
      return
    }
    shuffle(result).map(matchup => {
      var repeat = false
      history[0] && history.map(prevMatchup => {
        if(matchup.toString() == prevMatchup.matchup.toString() || matchup.reverse().toString() == prevMatchup.matchup.toString()){
         
          repeat = true;
          repeats.push(prevMatchup)
        }
      })
      if(!repeat){
        newMatches.push(matchup)
      }
    })
    if(newMatches.length > 0){
      setCurrentMatchup(newMatches[0])
      return
    } else if(repeats.length > 0) {
      objects.map(driver => {
        if(repeats[0].winner == driver.name){
          console.log(`adding elo to ${driver.name}`)
          driver.elo = driver.elo + 1
          counter += 1
          countMatches()
          getMatchup()
        }
      })
    } else {
      setDone(true)
    }
  }
  
  function countMatches() {
    counts = []
    for (const driver of objects) {
        var obj = driver.elo
        counts[obj] = counts[obj] ? counts[obj] + 1 : 1;
      }
  }
  countMatches()

  useEffect(() => {
    getMatchup()
  }, [])

  if(done){
    $('#content').addClass('done')
  }

  if(!done){
    matchupElements = currentMatchup.map(driver => {
      console.log(driver)
      var color, first
      objects.map(obj => {
        if(driver == obj.name){
          color = obj.team
          first = obj.first
        }
      })
      console.log(color)
      return (
        <div className="driver" >
          <img className="driver-image" id={driver} onClick={handlePick} style={{boxShadow: `0px 0px 5px 0px ${`${color}`}80`}} src={`https://media.formula1.com/content/dam/fom-website/drivers/2023Drivers/${driver}.jpg.img.1536.medium.jpg/1677069646195.jpg`} />
          <div className="driver-text">
            {driver == "zhou" && `${driver.toUpperCase()} ${first}`}
            {driver != "zhou" && `${first} ${driver.toUpperCase()}`}
          </div>
        </div>
      )
    })
  } else {
    finalElements = objects.sort((a, b) => b.elo - a.elo).slice(0, 5).map(driver => {
      return (
        <div className="driver driver-image-final" >
          <img className="driver-image" id={driver.name} src={`https://media.formula1.com/content/dam/fom-website/drivers/2023Drivers/${driver.name}.jpg.img.1536.medium.jpg/1677069646195.jpg`} />
        </div>
      )
    })
    finalTable = objects.sort((a, b) => b.elo - a.elo).map(driver => {
      return (
        <tr>
          <td style={{backgroundColor: driver.team}}>
          </td>
          <td style={{paddingLeft: "5px"}}>
            {driver.name == "zhou" && `${driver.name.toUpperCase()} ${driver.first}`}
            {driver.name != "zhou" && `${driver.first} ${driver.name.toUpperCase()}`}
          </td>
        </tr>
      )
    })
  }

  return (
    <div className="main">
      <div id="content" className="content">

        {!done && (
          <div className="drivers">
            {matchupElements}
          </div>
        )}
        {done && (
          <div className="final-container">
            <div className="drivers drivers-final">
              {finalElements}
            </div>
            <table>
              {finalTable}
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default App;
