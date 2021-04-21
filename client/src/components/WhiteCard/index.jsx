import React from "react";
import "./style.css";

function WhiteCard(props) {
  // Generate white card attached to user based on turn
  // Map through data to get random generated card string
const rng = Math.floor(Math.random() * 999999999)

  return(
    
      <div key={rng} className="d-flex justify-content-center">
        <div className="white-card-body">
          <h5 className="card-title">{props.card}</h5>
        </div>
     </div>
  
  )
};

export default WhiteCard; 