import React from "react";
import Lobby from "../Lobby";
import { Link, Route } from 'react-router-dom';

import "./style.css";

function JoinGame() {
  return (
    <form>
      <div class="form-group">
        <h4>Join Lobby</h4>
        <label for="lobbyCode">Lobby ID</label>
        <input type="password" class="form-control" id="lobbyCode" />
      </div>
      <Link to="/Lobby" type="submit" className="btn">Join Lobby</Link>
      <Route path="/Lobby" component={Lobby} />
    </form>
  )
}

export default JoinGame;