import axios from "axios";
import BlackCard from "../BlackCard";
import React, { useEffect, useState } from "react";
import "./style.css";
import ScoreBar from "../ScoreBar";

function VoteCard() {
  const [whiteCard, setWhiteCard] = useState([]);
  const [blackCard, setBlackCard] = useState();
  const [user, setUser] = useState();

  const updateScore = (e) => {
    console.log()
    axios.put(`/api/player/score/${e.target.dataset.id}`, { withCredentials: true })
    .then(res => {
      console.log("test pass")
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    axios.get('/api/round', { withCredentials: true })
    .then(res => {
      setBlackCard(res.data.data.prompt)
      const arr = JSON.parse(res.data.data.answers)
        setWhiteCard(arr)
      setUser(res.data.user_id)
      console.log(whiteCard)
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <ScoreBar />
      <BlackCard blackcard={blackCard}/>
      <div key={"cont"} className="vote-container">
        {whiteCard.map((e) => (
          <div key={whiteCard.indexOf(e)} onClick={(e) => updateScore(e)} data-id={e.user} className="vote-card">
            <div className="white-card-body">
              <h5 className="card-title">{e.answer}</h5>
            </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default VoteCard;