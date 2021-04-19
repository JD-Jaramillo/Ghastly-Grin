import React from "react";
import "./style.css";

function JoinGame() {
  return (
    <form>
      <div class="form-group">
        <h4>Join Lobby</h4>
        <label for="lobbyCode">Lobby ID</label>
        <input type="password" class="form-control" id="lobbyCode" />
      </div>
      <button type="submit" class="btn btn-primary">Join Lobby</button>
    </form>
  )
}

export default JoinGame;