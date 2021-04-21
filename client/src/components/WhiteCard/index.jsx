import React from "react";
import "./style.css";

function WhiteCard(props) {
  // Generate white card attached to user based on turn
  // Map through data to get random generated card string
  return(
    
      // <div className="card">
        <div className="white-card-body">
          <h5 className="card-title">{props.card}</h5>
          <button href="/" className="card-link btn">Play card</button>
        </div>
      // </div>
  
  )
};

export default WhiteCard;