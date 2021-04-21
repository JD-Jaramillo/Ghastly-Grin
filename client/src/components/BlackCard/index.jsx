import React from "react";
import "./style.css";

function BlackCard(props) {
  // Generate 7 cards for each player
    return (
      <div>
        <button onClick={props.singleCard}
        type="text"
        >
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{props.blackcard}</h5>
          </div>
        </div>
        </button>
      </div>
  )
}

export default BlackCard;