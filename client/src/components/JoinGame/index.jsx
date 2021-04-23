import React, { useRef } from "react";
import Lobby from "../Lobby";
import { Link, Route } from 'react-router-dom';
import axios from "axios";

import "./style.css";

function JoinGame() {
  const gameID = useRef();
  const newPlayer = async (event) => {
    const ID = gameID.current.value
    event.preventDefault();
    await axios.post('http://localhost:3001/api/player', {id: ID}, { withCredentials: true })
    .then(res => 
      document.location.replace("/Lobby")
      )
    .catch(err => console.log(err))
  }
  return (
    <form>
      <div className="form-group">
        <h4>Join Lobby</h4>
        <label htmlFor="lobbyCode">Lobby ID</label>
        <input ref={gameID} type="password" className="form-control" id="lobbyCode" />
      </div>
      <Link to="/Lobby" onClick={newPlayer} type="submit" className="btn">Join Lobby</Link>
      <Route path="/Lobby" component={Lobby} />
    </form>
  )
}

export default JoinGame;