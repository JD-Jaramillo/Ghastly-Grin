import React from "react";
import BlackCard from "../components/BlackCard";
import WhiteCard from "../components/WhiteCard";

function GamePlay() {
  const cardFiller = [{
      id: 1,
      value: "one card",
    }, {
      id: 2,
      value: "two card",
    }, {
      id: 3,
      value: "three card",
    }, {
      id: 4,
      value: "four card",
    }, {
      id: 5,
      value: "five card",
    }, {
      id: 6,
      value: "six card",
    }, {
      id: 7,
      value: "seven card",
    }, {
      id: 8,
      value: "eight card",
    }, {
      id: 9,
      value: "nine card",
    }, {
      id: 10,
      value: "ten card",
    }, {
      id: 11,
      value: "eleven card",
    }, {
      id: 12,
      value: "twelve card"
  }];

  const questions = [
    "what",
    "who",
    "when",
    "where",
    "how"
  ]

  const players = [
    "Juan",
    "Eric",
    "Milton",
    "Shawn",
    "Sommer"
  ];

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