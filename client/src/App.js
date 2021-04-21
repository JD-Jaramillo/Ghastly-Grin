import React from "react";
// import io from "socket.io-client"
import Header from "./components/Header/index";
// import Footer from './components/Footer';
import LogSign from "./components/LogSign";
import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";
import Lobby from "./components/Lobby";
import Instructions from "./components/Instructions";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import GamePlay from "./components/GamePlay";
// import UserContext from "./utils/userContext";
// const socket = io.connect("127.0.0.1:3001/");

function App() {
  
  // socket.emit("welcome", "connected");
  return (
    <Router>
      <div className='body-all'>
        <Header />
        <Instructions />
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
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
