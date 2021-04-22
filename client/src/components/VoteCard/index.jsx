import axios from "axios";
import BlackCard from "../BlackCard";
import React, { useEffect, useState } from "react";
import "./style.css";
import ScoreBar from "../ScoreBar";

function VoteCard() {
  const [whiteCard, setWhiteCard] = useState([]);
  const [blackCard, setBlackCard] = useState();
  const [user, setUser] = useState();
  const [users, setUsers] = useState();
  // const [owner, setOwner] = useState();
  // const [round, setRound] = useState();
  // const [maxRound, setMaxRound] = useState();
  const [vote, setVote] = useState(true);
  // const [toggle, setToggle] = useState(false)

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
            console.log(res.data.game_owner);
            const owner = res.data.game_owner;
            const round = res.data.round;
            const maxRound = res.data.maxrounds;
            console.log("owner:" + owner, "user: " + userID, "round: " + round, "maxround: " + maxRound)
            console.log(owner)
            if (round < maxRound) {
              if (userID === owner) {
                await axios.put('/api/game/', { withCredentials: true })
                  .then(res => console.log(res))
                  .catch(err => console.log(err))
                await axios.post('/api/round/', { user: usersID }, { withCredentials: true })
                  .then(res => {
                    console.log("id and owner yes match")
                    stopTimer();
                    document.location.replace('/GamePlay')
                    return;
                  })
                  .catch(err => console.log(err))
              } else {
                // document.location.replace('/GamePlay')
                console.log("id and owner no match")
              }
            } else {
              console.log("send them to end game")
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
    axios.get('/api/round', { withCredentials: true })
      .then(res => {
        setBlackCard(res.data.data.prompt)
        console.log(blackCard)
        setUsers(res.data.data.users)
        const arr = JSON.parse(res.data.data.answers)
        setWhiteCard(arr)
        setUser(res.data.user_id)
        const startTime = res.data.data.createdAt
        let endTime = new Date(startTime)
        endTime.setSeconds(endTime.getSeconds() + 25)
        timer(endTime)
      })
      .catch(err => console.log(err));

    axios.get('/api/user')
      .then(res => {
        setUser(res.data.user_id)
        console.log(res.data.user_id)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <ScoreBar />
      <BlackCard blackcard={blackCard} />
      <div key={"cont"} className="vote-container">
        {/* {user === owner ? <div onClick={setToggle(true)}>TOGGLE TIME</div> : null} */}
        {whiteCard ? whiteCard.map((e) => (
          <div key={whiteCard.indexOf(e)} onClick={vote ? (e) => updateScore(e) : null} data-id={e.user} className="vote-card">
            <div data-id={e.user} className="white-card-body">
              <h5 data-id={e.user} className="card-title">{e.answer}</h5>
            </div>
          </div>
        )) : <></>}
      </div>
    </div>
  )
}

export default VoteCard;