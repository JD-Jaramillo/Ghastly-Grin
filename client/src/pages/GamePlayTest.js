import React, { useState } from "react";
import BlackCard from "../components/BlackCard";
import WhiteCard from "../components/WhiteCard";
import answers from "../utils/answers";

function GamePlay() {
    const [whiteCard, setWhiteCard] = useState({});
    const [blackCard, setBlackCard] = useState({});
    const [player, setplayer] = useState({});
  
    const randomCards = () => {
      for (let i = 0; i < 8; i++) {
        let hand = cardFiller.value[i];
        return Math.floor(Math.random(hand) * cardFiller.length)
      }
    }
  
    const singleCard = () => {
      let question = [Math.floor(Math.random(questions) * questions.length)]
      return question; 
    }
  
    const playersHand = () => {
      const playerCards = players.forEach((player) => (randomCards()));
      return playerCards;
    }
    // 7 White Cards per player
    // 1 Black card per round
    // Players hand function, call randomCards for each player
    // add a function to push players into empty players array
    return (
      <>
      {/* Pass card attributes through */}
        <BlackCard onClick={singleCard} />
        <WhiteCard onClick={playersHand} value={cardFiller.value} />
      </>
    )
  }
  
  export default GamePlay;