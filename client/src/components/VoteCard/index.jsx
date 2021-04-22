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
  const [vote, setVote] = useState(true);
  const [owner, setOwner] = useState();
  // const [toggle, setToggle] = useState(false)


  const timer = (endTime) => {
    setInterval(() => {
      let currentTime = new Date();

      if (currentTime > endTime) {
        if (user === owner) {
          axios.post('/api/round/', {user: users}, { withCredentials: true })
          .then(res => {
            document.location.replace('/GamePlay')
            return;
          })
          .catch(err => console.log(err))
        } else {
          document.location.replace('/GamePlay')
        }
      }
    }, 1000);
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
        setUsers(res.data.data.users)
        const arr = JSON.parse(res.data.data.answers)
        setWhiteCard(arr)
        setUser(res.data.user_id)
        const startTime = res.data.data.createdAt
        let endTime = new Date(startTime)
        endTime.setSeconds(endTime.getSeconds() + 25)
        timer(endTime)
      })
      .catch(err => console.log(err))
    axios.get('/api/game', { withCredentials: true })
      .then(res => {
        setOwner(res.data.game_owner);
        var gameID = res.data.id;
      })
      .catch(err => console.log(err))
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
        {whiteCard.map((e) => (
          <div key={whiteCard.indexOf(e)} onClick={vote ? (e) => updateScore(e) : null} data-id={e.user} className="vote-card">
            <div data-id={e.user} className="white-card-body">
              <h5 data-id={e.user} className="card-title">{e.answer}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VoteCard;