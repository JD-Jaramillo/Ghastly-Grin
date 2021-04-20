import React from "react";
import "./style.css";

function WhiteCard(props) {
  // Generate white card attached to user based on turn
  // Map through data to get random generated card string
  return(
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{props.card}</h5>
          <a href="/" className="card-link">Play card</a>
        </div>
      </div>
    </div>
  )
};

export default WhiteCard;