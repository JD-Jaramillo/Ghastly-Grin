import React from "react";
// import io from "socket.io-client"
import Footer from './components/Footer';
import LogSign from "../src/components/LogSign";
import CreateGame from "../src/components/CreateGame";
import JoinGame from "../src/components/JoinGame";
import Lobby from "../src/components/Lobby";
import Homepage from "../src/components/Homepage";
import Instructions from "../src/components/Instructions";
import Header from "./components/Header/index";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import GamePlay from "./components/GamePlay";
import VoteCard from "./components/VoteCard";
// import UserContext from "./utils/userContext";
// const socket = io.connect("127.0.0.1:3001/");

function App() {

  // socket.emit("welcome", "connected");
  return (
    <Router>
      <div className='body-all'>
        <Header />
        <Instructions />
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/LogSign">
          <LogSign />
        </Route>
        <Route path="/CreateGame">
          <CreateGame />
          <JoinGame />
        </Route>
        <Route path="/Lobby">
          <Lobby />
        </Route>
        <Route path="/GamePlay">
          <GamePlay />
        </Route>
        <Route path="/VoteCard">
          <VoteCard />
        </Route>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
