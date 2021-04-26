import React, { useEffect, useState } from "react";
import BlackCard from "../BlackCard";
// import WhiteCard from "../WhiteCard";
// import questions from "../../utils/questions";
import axios from "axios";
import "./style.css";
import ScoreBar from "../ScoreBar";
import { useHistory } from "react-router";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Timer from '../Timer';

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
    axios.get('/api/game', {withCredentials: true})
      .then(res => {
        const gameTimer = res.data.timer;
        axios.get('/api/round', { withCredentials: true })
          .then(newRes => {
            setBlackCard(newRes.data.data.prompt)
            const startTime = newRes.data.data.createdAt
            let endTime = new Date(startTime)
            endTime.setSeconds(endTime.getSeconds() + gameTimer)
            timer(endTime)
          })
          .catch(err => console.log(err))
      })
    axios.get('/api/player/cards', { withCredentials: true })
      .then(res => {
        setWhiteCard(res.data.cards)
        setUser(res.data.user_id)
        console.log(res.data.user_id)
      })
      .catch(err => console.log(err))
  }, [])

  const matches = useMediaQuery('(min-width:1220px)');

  return (
    <>
      <ScoreBar />
      <Timer />
      <div className="container">
        <BlackCard blackcard={blackCard} />
        {matches ?
          <div className="d-flex flex-row">
            <div className="offset-rotate">
              {whiteCard.map((card, index) => (
                <div style={
                  {
                    transform: `rotate(${index * (90 / whiteCard.length)}deg) translate(-50%, -50%)`,
                    transformOrigin: `center 115%`
                  }
                }
                  onClick={answered ? null : submitCard}
                  className="card-element"
                  key={card}
                  data-ans={card}>
                  <div data-ans={card} className="white-card-body">
                    <h5 data-ans={card} onClick={(event) => event.stopPropagation()} className="card-title">{card}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div> :
          <div>
            <div className="mobile-card-container">
              <div>
                {whiteCard.map((card, index) => (
                  <div
                    style={
                      {
                        display: `flex`,
                        flexDirection: `column`,
                      }
                    }
                    onClick={answered ? null : submitCard}
                    className="d-flex justify-content-evenly"
                    key={card}
                    data-ans={card}>
                    <div data-ans={card} className="white-card-body">
                      <h5 data-ans={card} onClick={(event) => event.stopPropagation()} className="card-title">{card}</h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default GamePlay;