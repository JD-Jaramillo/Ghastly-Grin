import React from "react";
import "./style.css";

function CreateGame() {

  const newGame = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:9000/api/game/', {
      method: 'POST',
      body: "test",
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      console.log("successful game creation")
    } else {
      alert('Failed to create game.');
    }
  }

  return (
    <form>
      <div className="form-group">
        {/* <label for="exampleFormControlSelect1">How Many Players will your game have?</label>
        <select class="form-control" id="exampleFormControlSelect1">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select> */}
        <button onClick={newGame} type="submit" className="btn">Create Game</button>
      </div>
    </form>
  )
}

export default CreateGame;