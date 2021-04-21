import React, { useEffect, useState } from "react";
import BlackCard from "../BlackCard";
import WhiteCard from "../WhiteCard";
import answers from "../../utils/answers";
// import questions from "../../utils/questions";
import axios from "axios";
import "./style.css";

function GamePlay() {
  const [whiteCard, setWhiteCard] = useState([]);
  const [blackCard, setBlackCard] = useState();
  const [user, setUser] = useState();
  // const [player, setplayer] = useState({});

  useEffect(() => {
    axios.get('/api/round', { withCredentials: true })
      .then(res => {
        setBlackCard(res.data.prompt)
        console.log(res.data)
      })
      .catch(err => console.log(err))
    axios.get('/api/player/cards', { withCredentials: true })
      .then(res => {
        setWhiteCard(res.data.cards)
        setUser(res.data.user_id)
      })
      .catch(err => console.log(err))
  }, [])

  // fanStyle(num) {

  // }

  return (
    <div className="container-fluid">
      <div className="d-flex flex-row">
        <BlackCard blackcard={blackCard} />
      </div>
      <div className="d-flex flex-row">
      <div className="offset-rotate">
      {whiteCard.map((card, index) => {
        // const offset = index - Math.floor(whiteCard.length / 2)
       return <WhiteCard key={index} index={index} length={whiteCard.length} card={card} user={user} />
})}    
      </div>
      </div>
    </div>
  )
}

export default GamePlay;