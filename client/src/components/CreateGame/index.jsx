import React from "react";
import { Link, Route } from 'react-router-dom';
import Lobby from '../Lobby';
import "./style.css";
import uuid from "react-uuid"

function CreateGame() {

  const newGame = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3001/api/game/', {
      method: 'POST',
      credentials: 'include',
      // body: JSON.stringify({id: uuid()}),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace("/Lobby")
    } else {
      alert('Failed to create game.');
    }
  }

  return (
    <form>
      <div className="form-group">
        <h4>Create a Lobby</h4>
        <p>(click create lobby to get your secure lobby id)</p>
        {/* <label for="exampleFormControlSelect1">How Many Players will your game have?</label>
        <select className="form-control" id="exampleFormControlSelect1">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select> */}
        {/* onClick={newGame} */}
        <Link to="/Lobby" onClick={newGame} type="submit" className="btn">Create Lobby</Link>
        <Route path="/Lobby" component={Lobby} />
      </div>
    </form>
  )
}

export default CreateGame;