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
        <Instructions />
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/LogSign">
          <LogSign />
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
