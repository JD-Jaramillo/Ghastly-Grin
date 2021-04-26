import React, { useState, useEffect } from "react";
// import io from "socket.io-client"
import Footer from './components/Footer';
import LogSign from "../src/components/LogSign";
import CreateGame from "../src/components/CreateGame";
import JoinGame from "../src/components/JoinGame";
import Lobby from "./components/Lobby";
import Homepage from "../src/components/Homepage";
import Instructions from "../src/components/Instructions";
import Header from "./components/Header/index";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import GamePlay from "./components/GamePlay";
import VoteCard from "./components/VoteCard";
import axios from 'axios';
import HeaderMobile from "./components/HeaderMobile";
import EndGame from "./components/EndGame";
import { AppContext } from "./utils/userContext";
import Particles from "react-particles-js";
// const socket = io.connect("127.0.0.1:3001/");

function App() {
  const [loggedIn, setLoggedIn] = useState();

  useEffect(() => {
    axios.get('/api/user')
      .then(res => {
        setLoggedIn(res.data.loggedIn)
      })
  }, [])

  // socket.emit("welcome", "connected");

  return (
    <Router>
      <Header />
      <HeaderMobile />
      <div className="main-content">
        {/* <Particles 
          className="particles"
          params={{
            particles: {
              number: 
                { value: 200, density: { enable: true, value_area: 1000 } },
              color: {value: "#551A8B"},
              shape: {
                type: "circles",
                stroke: { width: 10, color: "#551A8B" },
                polygon: { nb_sides: 5 },
                image: { src: "img/github.svg", width: 100, height: 100 }
            },
            line_linked: {
              enable: true,
              distance: 200,
              color: "#551A8B",
              opacity: 0.1,
              width: 2
            },
            move: {
              enable: false,
            }
          }
          }}/> */}
        <Particles
          className="particles"
          params={{
            "particles": {
              "number": {
                "value": 8,
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
                  "circle"
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
                    "src": "/randomCard.png",
                    "height": 30,
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
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/LogSign">
          <AppContext.Provider value={{ loggedIn, setLoggedIn }}>
            <LogSign />
          </AppContext.Provider>
        </Route>
        <Route exact path="/CreateGame">
          <CreateGame />
          <JoinGame />
        </Route>
        <Route exact path="/Lobby">
          <Lobby />
        </Route>
        <Route exact path="/GamePlay">
          {loggedIn ? <GamePlay /> : <Homepage />}
        </Route>
        <Route exact path="/VoteCard">
          <VoteCard />
        </Route>
        <Route exact path="/EndGame">
          <EndGame />
        </Route>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
