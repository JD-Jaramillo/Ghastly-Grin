import React from "react";
import "./style.css";

function BlackCard() {
  // Generate 7 cards for each player
  return (
    <div>
      <div class="card">
        <div class="card-body">
        <h5 class="card-title">Black Card</h5>
        <a href="/" class="card-link">Play card</a>
      </div>
    </div>
  </div>
  )
}

export default BlackCard;