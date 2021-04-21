import React, { useEffect, useState } from "react";
import BlackCard from "../BlackCard";
import WhiteCard from "../WhiteCard";
import answers from "../../utils/answers";
// import questions from "../../utils/questions";
import axios from "axios";

function GamePlay() {
    // const [whiteCard, setWhiteCard] = useState({});
    const [blackCard, setBlackCard] = useState();
    // const [player, setplayer] = useState({});
  
    const hand = [];

    const randomCards = () => {
      for (let i = 0; i < 7; i++) {
        const whiteCards = Math.floor(Math.random() * answers.length)
        hand.push(answers[whiteCards]);
      }
    }
    
    randomCards();
    useEffect(() => {
      axios.get('/api/round', { withCredentials: true })
      .then(res => {
        setBlackCard(res.data.prompt)
        console.log(res.data)
      })
      .catch(err => console.log(err))
    }, [])
    return (
      <div className="container-fluid">
      {/* Pass card attributes through */}
        <BlackCard blackcard={blackCard}/>
        {hand.map((card) => (
            <WhiteCard card={card} />
        ))}
      </div>
    )
  }
  
  export default GamePlay;