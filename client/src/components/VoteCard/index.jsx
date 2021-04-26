import axios from "axios";
import BlackCard from "../BlackCard";
import React, { useEffect, useState } from "react";
import "./style.css";
import ScoreBar from "../ScoreBar";
import { useHistory } from "react-router";

function VoteCard() {
  const history = useHistory();
  const [whiteCard, setWhiteCard] = useState([]);
  const [blackCard, setBlackCard] = useState();
  const [vote, setVote] = useState(true);

  function timer(endTime) {
    var timerInterval = setInterval(action, 1000)
    function stopTimer() {
      clearInterval(timerInterval)
    }
    function action() {
      let currentTime = new Date();
      let userID;
      let usersID;
      if (currentTime > endTime) {
        axios.get('/api/game', { withCredentials: true })
          .then(async res => {
            await axios.get('/api/round', { withCredentials: true })
              .then(res => {
                userID = res.data.user_id;
                usersID = res.data.data.users;
              })
            const owner = res.data.game_owner;
            const round = res.data.round;
            const maxRound = res.data.maxrounds;
            if (round <= maxRound) {
              if (userID === owner) {
                await axios.put('/api/game/', { withCredentials: true })
                  .then(res => console.log(res))
                  .catch(err => console.log(err))
                await axios.post('/api/round/', { user: usersID }, { withCredentials: true })
                  .then(res => {
                    console.log("id and owner yes match")
                    stopTimer();
                    history.push('/GamePlay')
                    return;
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
          })
          .catch(err => console.log(err));

      }
    };
  }

  const updateScore = (e) => {
    console.log()
    axios.put(`/api/player/score/${e.target.dataset.id}`, { withCredentials: true })
      .then(res => {
        console.log("test pass")
        setVote(false)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    axios.get('/api/game', { withCredentials: true })
      .then(result => {
        const timerSet = result.data.timer * 2
        axios.get('/api/round', { withCredentials: true })
          .then(res => {
            setBlackCard(res.data.data.prompt)
            const arr = JSON.parse(res.data.data.answers)
            setWhiteCard(arr)
            const startTime = res.data.data.createdAt
            let endTime = new Date(startTime)
            endTime.setSeconds(endTime.getSeconds() + timerSet)
            timer(endTime)
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));

  }, [blackCard])

  return (
    <>
      <ScoreBar />
      <div className="container">
        <BlackCard blackcard={blackCard} />
        <div key={"cont"} className="vote-container">
          {whiteCard ? whiteCard.map((e) => (
            <div onMouseOver={(e) => e.target.style.zIndex = 1} key={whiteCard.indexOf(e)} onClick={vote ? (e) => updateScore(e) : null} data-id={e.user} className="vote-card" style={{zIndex: "1"}}>
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