import React from "react";
import BlackCard from "../BlackCard";
import WhiteCard from "../WhiteCard";
import "./style.css";

function VoteCard() {
// for each white card played in a round, display around to black card

  return (
    <div>
      <BlackCard black/>
      <WhiteCard />
    </div>
  )
}

export default VoteCard;