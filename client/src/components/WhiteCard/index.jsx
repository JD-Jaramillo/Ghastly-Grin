import axios from "axios";
import React from "react";
import { useHistory } from "react-router";
import "./style.css";

function WhiteCard(props) {
  const history = useHistory();
  // Generate white card attached to user based on turn
  // Map through data to get random generated card string
  const userID = props.user;
  const ans = props.card;

  const rotateStyle = {
    transform: `rotate(${props.index * (180/props.length)}deg) translate(-50%, -50%)`,
    transformOrigin: `center 60%`

  };


  const submitCard = () => {
    axios.put('/api/round', {user: userID , answer: ans}, { withCredentials: true })
    .then(res => {
      history.push("/VoteCard")
    })
    .catch(err => console.log(err))
  }

  return (

    <div style={rotateStyle} onClick={submitCard} className="card-element">
      <div className="white-card-body">
        <h5 className="card-title">{props.card}</h5>
      </div>
    </div>

  )
};

export default WhiteCard;