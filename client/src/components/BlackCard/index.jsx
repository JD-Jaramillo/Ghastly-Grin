import React from "react";
import "./style.css";

function BlackCard(props) {
  // Generate 7 cards for each player
    return (
      <div>
        <button onClick={props.singleCard}
        type="text"
        >
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{props.questions}</h5>
          </div>
        </div>
        </button>
      </div>
  )
}

export default BlackCard;