import axios from "axios";
import BlackCard from "../BlackCard";
import React, { useEffect, useState } from "react";
import "./style.css";

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
      console.log(res)
      setBlackCard(res.data.data.prompt)
      const arr = JSON.parse(res.data.data.answers)
      arr.forEach(answer => {
        setWhiteCard([...whiteCard, answer])
      })
      setUser(res.data.user_id)
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <BlackCard blackcard={blackCard}/>
      <div className="vote-container">
        {whiteCard.map((e) => (
          <div onClick={(e) => updateScore(e)} data-id={e.user} className="vote-card">
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