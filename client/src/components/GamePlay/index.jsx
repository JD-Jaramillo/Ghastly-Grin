import React, { useEffect, useState } from "react";
import BlackCard from "../BlackCard";
// import WhiteCard from "../WhiteCard";
// import questions from "../../utils/questions";
import axios from "axios";
import "./style.css";
import ScoreBar from "../ScoreBar";

function GamePlay() {
  const [whiteCard, setWhiteCard] = useState([]);
  const [blackCard, setBlackCard] = useState();
  const [user, setUser] = useState();
  const [answered, setAnswered] = useState(false);
  // const [player, setplayer] = useState({});


  const timer = (endTime) => {
    var timerInterval = setInterval(action, 1000)
    function stopTimer() {
      clearInterval(timerInterval)
    }

    function action() {
      let currentTime = new Date();

      if (currentTime > endTime) {
        stopTimer();
        document.location.replace('/VoteCard');

      }
    };
  }

  const submitCard = (e) => {
    console.log(e.target.dataset.ans)
    axios.put('/api/round', { user: user, answer: e.target.dataset.ans }, { withCredentials: true })
      .then(res => {
        setAnswered(true);
        axios.put(`/api/player/card`, { card: e.target.dataset.ans }, { withCredentials: true })
          .then(res => console.log("playerupdated"))
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
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
        console.log(res.data.user_id)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
    <ScoreBar />
    <div className="container-fluid">
      <BlackCard blackcard={blackCard} />
      <div className="d-flex flex-row">
        <div className="offset-rotate">
          {whiteCard.map((card, index) => (
            <div style={
              {
                transform: `rotate(${index * (180 / 7)}deg) translate(-50%, -50%)`,
                transformOrigin: `center 60%`
              }
            }
              onClick={submitCard}
              className="card-element"
              data-ans={card}>
              <div data-ans={card} className="white-card-body">
                <h5 data-ans={card} className="card-title">{card}</h5>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
    </>
  )
  // <div disabled={answered} key={index} index={index} data-ans={card} onClick={!answered ? (e) => submitCard(e) : null} style={
  //   {
  //     transform: `rotate(${index * (60 / 7)}deg) translate(-150px, -100px)`
  //   }}
  //   className="d-flex justify-content-center white-card-el">
  //   <div data-ans={card} className="white-card-body">
  //     <h5 data-ans={card} className="card-title">{card}</h5>
  //   </div>
  // </div>
}

export default GamePlay;