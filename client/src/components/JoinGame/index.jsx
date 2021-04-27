import React, { useRef } from "react";
import Lobby from "../Lobby";
import { Route, useHistory } from 'react-router-dom';
import axios from "axios";
import "./style.css";

function JoinGame(props) {
  const setGameID = props.setGameID
  const setOwner = props.setOwner
  const history = useHistory();
  const gameID = useRef();
  const newPlayer = async (event) => {
    const ID = gameID.current.value
    event.preventDefault();
    await axios.post('/api/player', { id: ID }, { withCredentials: true })
      .then(res => {
        setGameID(res.data.game_id);
        setOwner(false);
        history.push("/Lobby")
      }
      )
      .catch(err => console.log(err))
  }
  return (
    <form>
      <div className="form-group">
        <h4>Join Lobby</h4>
        <label htmlFor="lobbyCode">Lobby ID</label>
        <input ref={gameID} type="text" className="form-control" id="lobbyCode" />
        <button style={{ zIndex: "1" }} onClick={newPlayer} type="click" className="btn">Join Lobby</button>
      </div>
      <Route path="/Lobby" component={Lobby} />
    </form>
  )
}

export default JoinGame;