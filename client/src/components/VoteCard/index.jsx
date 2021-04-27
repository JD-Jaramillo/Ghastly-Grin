import axios from "axios";
import BlackCard from "../BlackCard";
import React, { useCallback, useEffect, useState } from "react";
import "./style.css";
import ScoreBar from "../ScoreBar";
import { useHistory } from "react-router";
import Timer from '../Timer';


function VoteCard(props) {
  const history = useHistory();
  const [whiteCard, setWhiteCard] = useState([]);
  const [vote, setVote] = useState(true);
  const clock = props.timer;
  const blackCard = props.blackCard;
  const owner = props.owner;
  const rounds = props.rounds;
  // const setRounds = props.setRounds;
  const maxRounds = props.maxRounds;
  const players = props.players;
  const [componentMounted, setComponentMounted] = useState(true)

  const timer = useCallback((endTime) => {
    console.log("Vote Card Timer Run")
    var timerInterval = setInterval(action, 1000)
    function stopTimer() {
      clearInterval(timerInterval)
    }

    function action() {
      let currentTime = new Date();
      if (currentTime > endTime) {
        if (rounds <= maxRounds) {

          if (owner) {
            axios.put('/api/game/', { withCredentials: true })
              .then(res => console.log(res))
              .catch(err => console.log(err))
            axios.post('/api/round/', { user: players }, { withCredentials: true })
              .then(res => {
                console.log("id and owner yes match")
                stopTimer();
                history.push('/GamePlay')
              })
              .catch(err => console.log(err))
          } else {
            stopTimer();
            history.push('/GamePlay')
            console.log("id and owner no match")
          }
        } else {
          stopTimer();
          history.push('/EndGame')
        }
      }
    };
  }, [history, owner, rounds, maxRounds, players])

  const updateScore = (e) => {
    axios.put(`/api/player/score/${e.target.dataset.id}`, { withCredentials: true })
      .then(res => {
        setVote(false)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    console.log("Vote Card Use Effect Ran Once");
    if (componentMounted) {
      axios.get('/api/round', { withCredentials: true })
        .then(res => {
          const arr = JSON.parse(res.data.data.answers)
          const startTime = res.data.data.createdAt
          let endTime = new Date(startTime)
          endTime.setSeconds(endTime.getSeconds() + (clock * 2))
          setWhiteCard(arr)
          timer(endTime)
        })
        .catch(err => console.log(err));
    }
    return () => {
      setComponentMounted(false)
    }
  }, [timer, clock, componentMounted])

  return (
    <>
      <ScoreBar />
      <Timer timer={clock} />
      <div className="container">
        <BlackCard blackcard={blackCard} />
        <div key={"cont"} className="vote-container">
          {whiteCard ? whiteCard.map((e) => (
            <div onMouseOver={(e) => e.target.style.zIndex = 1} key={whiteCard.indexOf(e)} onClick={vote ? (e) => updateScore(e) : null} data-id={e.user} className="vote-card" style={{ zIndex: "1" }}>
              <div data-id={e.user} className="white-card-body">
                <h5 data-id={e.user} className="card-title">{e.answer}</h5>
              </div>
            </div>
          )) : <></>}
        </div>
      </div>
    </>
  )
}

export default VoteCard;