import React, { useState } from "react";
import io from "socket.io-client"
import Header from "../src/components/Header/index";
import Footer from './components/Footer';
import LogSign from "../src/components/LogSign";
import CreateGame from "../src/components/CreateGame";
import JoinGame from "../src/components/JoinGame";
import Lobby from "../src/components/Lobby";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
const socket = io.connect("127.0.0.1:3001/");

function App() {
  const [apiFetch, setApiFetch] = useState();

  const callAPI = () => {
    fetch("http://localhost:3001/testAPI")
      .then(res => res.text())
      .then(res => setApiFetch(res))
  }


  callAPI();

  socket.emit("welcome", "connected");
  return (
    <Router>
      <div>
        <Header />
        <p>
          {apiFetch}
        </p>
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
