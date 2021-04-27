import React, { useCallback, useEffect, useState } from "react";
import BlackCard from "../BlackCard";
import axios from "axios";
import "./style.css";
import ScoreBar from "../ScoreBar";
import { useHistory } from "react-router";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Timer from '../Timer';

function GamePlay(props) {
  const whiteCard = props.hand;
  const setWhiteCard = props.setHand;
  const user = props.userID
  const setPlayers = props.setPlayers
  const blackCard = props.blackCard
  const setBlackCard = props.setBlackCard
  const setRounds = props.setRounds
  const [answered, setAnswered] = useState(false);
  const history = useHistory();
  const clock = props.timer;

  const timer = useCallback((endTime) => {
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
  }, [history]);

  const getGame = useCallback(() => {
    axios.get('/api/round', { withCredentials: true })
      .then(newRes => {
        const startTime = newRes.data.data.createdAt;
        let endTime = new Date(startTime);
        endTime.setSeconds(endTime.getSeconds() + clock);
        timer(endTime);
        setBlackCard(newRes.data.data.prompt)
        setPlayers(newRes.data.data.users)
      })
      .catch(err => console.log(err))
  }, [timer, clock, setBlackCard, setPlayers])

  const submitCard = (e) => {
    e.target.style = "display: none"
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
    let runThrough;
    if (runThrough !== "done") {
      getGame();
      axios.get('/api/player/cards', { withCredentials: true })
        .then(res => {
          setWhiteCard(res.data.cards)
        })
        .catch(err => console.log(err))
        setRounds(prevRounds => prevRounds + 1)
    }
    runThrough = "done";
  }, [getGame, setWhiteCard, setRounds])

  const matches = useMediaQuery('(min-width:1220px)');

  return (
    <>
      <ScoreBar />
      <Timer timer={clock} />
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
              <div className="row flex-wrap">
                {whiteCard.map((card, index) => (
                  <div
                    style={
                      {
                        marginTop: `-50px`,
                        marginBottom: `-50px`

                      }
                    }

                    onClick={answered ? null : submitCard}
                    className="d-flex col justify-content-evenly"
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