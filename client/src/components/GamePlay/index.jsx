import React, { useState } from "react";
import BlackCard from "../BlackCard";
import WhiteCard from "../WhiteCard";
import answers from "../../utils/answers";
import questions from "../../utils/questions";

function GamePlay() {
    // const [whiteCard, setWhiteCard] = useState({});
    // const [blackCard, setBlackCard] = useState({});
    // const [player, setplayer] = useState({});
  
    const hand = [];

    const randomCards = () => {
      for (let i = 0; i < 7; i++) {
        const whiteCards = Math.floor(Math.random() * answers.length)
        hand.push(answers[whiteCards]);
      }
    }
  
    randomCards();

    return (
      <div className="container-fluid">
      {/* Pass card attributes through */}
      <div className="row">
        <BlackCard />
      </div>
      <div className="row d-flex justify-content-center">
        {hand.map((card) => (
            <WhiteCard card={card} />
        ))}
      </div>
      </div>
    )
  }
  
  export default GamePlay;