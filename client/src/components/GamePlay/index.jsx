import React, { useEffect, useState } from "react";
import BlackCard from "../BlackCard";
import WhiteCard from "../WhiteCard";
import answers from "../../utils/answers";
// import questions from "../../utils/questions";
import axios from "axios";

function GamePlay() {
  const [whiteCard, setWhiteCard] = useState([]);
  const [blackCard, setBlackCard] = useState();
  const [user, setUser] = useState();
  // const [player, setplayer] = useState({});

  const timer = (endTime) => {
    setInterval(() => {
      let currentTime = new Date();

      if (currentTime > endTime) {
        document.location.replace('/VoteCard')
      }
    }, 1000);
  }

  useEffect(() => {
    axios.get('/api/round', { withCredentials: true })
      .then(res => {
        setBlackCard(res.data.data.prompt)
        const startTime = res.data.data.createdAt
        let endTime = new Date(startTime)
        endTime.setSeconds(endTime.getSeconds() + 10)
        timer(endTime)
      })
      .catch(err => console.log(err))
    axios.get('/api/player/cards', { withCredentials: true })
      .then(res => {
        setWhiteCard(res.data.cards)
        setUser(res.data.user_id)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="container-fluid">
      <BlackCard blackcard={blackCard} />
      {whiteCard.map((card) => (
        <WhiteCard key={whiteCard.indexOf(card)} card={card} user={user} />
      ))}
    </div>
  )
}

export default GamePlay;