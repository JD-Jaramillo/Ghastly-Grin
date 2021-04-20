import React from "react";
import "./style.css";

function WhiteCard() {
  // Generate white card attached to user based on turn
  // Map through data to get random generated card string
  return(
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Generated White Card for player</h5>
          <a href="/" class="card-link">Play card</a>
        </div>
      </div>
    </div>
  )
};

export default WhiteCard;