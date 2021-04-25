import React, { useEffect, useState } from "react";
import BlackCard from "../BlackCard";
// import WhiteCard from "../WhiteCard";
// import questions from "../../utils/questions";
import axios from "axios";
import "./style.css";
import ScoreBar from "../ScoreBar";
import CardCarousel from "../CardCarousel";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useHistory } from "react-router";

function GamePlay() {
  const [whiteCard, setWhiteCard] = useState([]);
  const [blackCard, setBlackCard] = useState();
  const [user, setUser] = useState();
  const [answered, setAnswered] = useState(false);
  // const [player, setplayer] = useState({});
  const history = useHistory();


  const timer = (endTime) => {
    var timerInterval = setInterval(action, 1000)
    function stopTimer() {
      clearInterval(timerInterval)
    }

    function action() {
      let currentTime = new Date();

      if (currentTime > endTime) {
        stopTimer();
        history.push('/VoteCard');

      }
    };
  }

  const submitCard = (e) => {
    e.target.style = "display: none"
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

  const matches = useMediaQuery('(min-width:1030px)');

  return (
    <>
      <ScoreBar />
      <div className="container">
        <BlackCard blackcard={blackCard} />
        {matches ?
          <div className="d-flex flex-row">
            <div className="offset-rotate">
              {whiteCard.map((card, index) => (
                <div style={
                  {
                    transform: `rotate(${index * (90 / 7)}deg) translate(-50%, -50%)`,
                    transformOrigin: `center 115%`
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
          : <CardCarousel/> }
      </div>
    </>
  )
}

export default GamePlay;