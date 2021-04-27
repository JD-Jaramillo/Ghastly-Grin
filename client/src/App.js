import React, { useState, useEffect } from "react";
import Footer from './components/Footer';
import LogSign from "../src/components/LogSign";
import CreateGame from "../src/components/CreateGame";
import JoinGame from "../src/components/JoinGame";
import Lobby from "./components/Lobby";
import Homepage from "../src/components/Homepage";
import Instructions from "../src/components/Instructions";
import Header from "./components/Header/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import GamePlay from "./components/GamePlay";
import VoteCard from "./components/VoteCard";
import axios from 'axios';
import HeaderMobile from "./components/HeaderMobile";
import EndGame from "./components/EndGame";
import Particles from "react-particles-js";
// import io from "socket.io-client"
// const socket = io.connect("127.0.0.1:3001/");

function App() {
  const [loggedIn, setLoggedIn] = useState();
  const [gameID, setGameID] = useState(false);
  const [timer, setTimer] = useState();
  const [maxRounds, setMaxRounds] = useState();
  const [rounds, setRounds] = useState();
  const [userID, setUserID] = useState();
  const [owner, setOwner] = useState(false);
  const [players, setPlayers] = useState([]);
  const [blackCard, setBlackCard] = useState([]);
  const [hand, setHand] = useState([]);
  const [stopTime, setStopTime] = useState(false);

  useEffect(() => {
    axios.get('/api/user')
      .then(res => {
        setUserID(res.data.user_id)
        setLoggedIn(res.data.loggedIn)
        if (res.data.game_id !== null) {
          setGameID(res.data.game_id)
        }
      })
      .catch(err => console.log(err))
  }, [])

  // socket.emit("welcome", "connected");

  return (
    <Router>
      <Header setStopTime={setStopTime} loggedIn={loggedIn} setLoggedIn={setLoggedIn} gameID={gameID} />
      <HeaderMobile setStopTime={setStopTime} loggedIn={loggedIn} setLoggedIn={setLoggedIn} gameID={gameID} />
      <div className="main-content">
        <Particles
          className="particles"
          params={{
            "particles": {
              "number": {
                "value": 15,
                "density": {
                  "enable": true,
                  "value_area": 800
                }
              },
              "line_linked": {
                "enable": false
              },
              "move": {
                "speed": 1,
                "out_mode": "out"
              },
              "shape": {
                "type": [
                  "image",
                  "image",
                ],
                "image": [
                  {
                    "src": "/ghastlyGrinLogoTrans_green.png",
                    "height": 20,
                    "width": 23
                  },
                  {
                    "src": "/ghastlyGrinLogoTrans_purple.png",
                    "height": 20,
                    "width": 20
                  },
                  {
                    "src": "/ghastlyGrinLogoTrans.png",
                    "height": 20,
                    "width": 20
                  }
                ]
              },
              "color": {
                "value": "#CCC"
              },
              "size": {
                "value": 30,
                "random": false,
                "anim": {
                  "enable": true,
                  "speed": 4,
                  "size_min": 10,
                  "sync": false
                }
              }
            },
            "retina_detect": false
          }} />
        <Instructions />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/LogSign">
            <LogSign setUserID={setUserID} setLoggedIn={setLoggedIn} setGameID={setGameID} />
          </Route>
          <Route exact path="/CreateGame">
            {loggedIn ? (<><CreateGame
              setOwner={setOwner}
              setGameID={setGameID}

            />
              <JoinGame
                setGameID={setGameID}
                setOwner={setOwner}

              />
            </>)
              :
              <LogSign setUserID={setUserID} setLoggedIn={setLoggedIn} />}
          </Route>
          <Route exact path="/Lobby">
            {loggedIn ?
              <Lobby
                timer={timer}
                setTimer={setTimer}
                owner={owner}
                setOwner={setOwner}
                userID={userID}
                setGameID={setGameID}
                gameID={gameID}
                maxRounds={maxRounds}
                setMaxRounds={setMaxRounds}
                setRounds={setRounds}
                stopTime={stopTime}
              />
              : <LogSign setUserID={setUserID} setLoggedIn={setLoggedIn} setGameID={setGameID} />}
          </Route>
          <Route exact path="/GamePlay">
            {loggedIn ?
              <GamePlay
                timer={timer}
                setTimer={setTimer}
                maxRounds={maxRounds}
                rounds={rounds}
                userID={userID}
                owner={owner}
                blackCard={blackCard}
                setBlackCard={setBlackCard}
                hand={hand}
                setHand={setHand}
                setPlayers={setPlayers}
                setRounds={setRounds}

              /> : <Homepage />}
          </Route>
          <Route exact path="/VoteCard">
            <VoteCard
              timer={timer}
              setTimer={setTimer}
              blackCard={blackCard}
              setBlackCard={setBlackCard}
              owner={owner}
              rounds={rounds}
              setRounds={setRounds}
              maxRounds={maxRounds}
              players={players}

            />
          </Route>
          <Route exact path="/EndGame">
            <EndGame />
          </Route>
          <Route >
            <Homepage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
