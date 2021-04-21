import axios from "axios";
import React from "react";
import "./style.css";

function WhiteCard(props) {
  // Generate white card attached to user based on turn
  // Map through data to get random generated card string
  const userID = props.user;
  const ans = props.card;

  const submitCard = () => {
    axios.put('/api/round', {user: userID , answer: ans}, { withCredentials: true })
    .then(res => {
      document.location.replace("/VoteCard")
    })
    .catch(err => console.log(err))
  }

  return (

    <div onClick={submitCard}>
      <div className="white-card-body">
        <h5 className="card-title">{props.card}</h5>
      </div>
    </div>

  )
};

export default WhiteCard;