
import './App.css';
import { useState, useEffect } from "react"
const objects = [
  {
      name: "verstappen",
      elo: 1
  },
  {
      name: "hamilton",
      elo: 1
  },
  {
      name: "alonso",
      elo: 1
  },
  {
      name: "ricciardo",
      elo: 1
  },
  {
      name: "magnussen",
      elo: 1
  },
  {
      name: "albon",
      elo: 1
  },
  {
      name: "perez",
      elo: 1
  },
  {
      name: "bottas",
      elo: 1
  },
  {
      name: "zhou",
      elo: 1
  },
  {
      name: "tsunoda",
      elo: 1
  },
  {
      name: "russell",
      elo: 1
  },
  {
      name: "sargeant",
      elo: 1
  },
  {
      name: "leclerc",
      elo: 1
  },
  {
      name: "sainz",
      elo: 1
  },
  {
      name: "hulkenberg",
      elo: 1
  },
  {
      name: "norris",
      elo: 1
  },
  {
      name: "piastri",
      elo: 1
  },
  {
      name: "gasly",
      elo: 1
  },
  {
      name: "ocon",
      elo: 1
  },
  {
      name: "stroll",
      elo: 1
  },
]

function App() {

  const [currentMatchup, setCurrentMatchup] = useState([])
  const [done, setDone] = useState(false)
  var matchupElements, finalElements
  const counts = []
  

  function handlePick(e){

    for(var i = 0; i < objects.length; i++){
      if(objects[i].name == e.target.id){
        objects[i].elo += 1
      }
    }
    countMatches()
    if(counts.length-1 !== objects.length){
      console.log(objects)
      getMatchup()
    } else {
      setDone(true)
      console.log(objects)
    }
  }
  
  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
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
    setCurrentMatchup(shuffle(result)[0])
  }
  
  
  
  function countMatches() {
    for (const driver of objects) {
        var obj = driver.elo
        counts[obj] = counts[obj] ? counts[obj] + 1 : 1;
      }
  }
  countMatches()

  useEffect(() => {
    getMatchup()
  }, [])

  if(!done){
    matchupElements = currentMatchup.map(driver => {
      return (
        <div className="driver" >
          <img className="driver-image" id={driver} onClick={handlePick} src={`https://media.formula1.com/content/dam/fom-website/drivers/2023Drivers/${driver}.jpg.img.1536.medium.jpg/1677069646195.jpg`} />
        </div>
      )
    })
  } else {
    finalElements = objects.sort((a, b) => b.elo - a.elo).map(driver => {
      return (
        <div className="driver small" >
          <img className="driver-image" id={driver.name} onClick={handlePick} src={`https://media.formula1.com/content/dam/fom-website/drivers/2023Drivers/${driver.name}.jpg.img.1536.medium.jpg/1677069646195.jpg`} />
        </div>
      )
    })
  }


  //https://media.formula1.com/content/dam/fom-website/drivers/2023Drivers/verstappen.jpg.img.1536.medium.jpg

  return (
    <div className="main">
      <div className="content">
        {!done && matchupElements}
        {done && finalElements}
      </div>
    </div>
  )
}

export default App;
