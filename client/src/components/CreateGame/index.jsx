import axios from "axios";
import React from "react";
import { Link, Route, useHistory } from 'react-router-dom';
import Lobby from '../Lobby';
import "./style.css";
// import uuid from "react-uuid"

function CreateGame(props) {
  const history = useHistory();
  const setOwner = props.setOwner;
  const setGameID = props.setGameID
  const newGame = async (event) => {
    event.preventDefault();
    axios.post('/api/game', { test: "test" }, { withCredentials: true })
      .then(res => {
        setOwner(true);
        setGameID(res.data.game_id)
        history.push("/Lobby")
      })
      .catch(err => console.log(err))
  }

  return (
    <form className="createPage">
      <div className="form-group">
        <h4>Create a Lobby</h4>
        <p>(click create lobby to get your secure lobby id)</p>
        
        <Link to="/Lobby" onClick={newGame} type="submit" className="btn">Create Lobby</Link>
        <Route path="/Lobby" component={Lobby} />
      </div>
    </form>
  )
}

export default CreateGame;