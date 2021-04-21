import React from "react";
import "./style.css";

function ScoreBar() {
  return (
    <div className="score">
      <h5>Scoreboard:</h5>
      <ul className ="scoreList">
        <li>Player 1: </li>
        <li>Player 2: </li>
        <li>Player 3: </li>
      </ul>
    </div>
  )
}

export default ScoreBar;