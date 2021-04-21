import axios from "axios";
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
      setUser(res.data.data.user_id)
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <p>{user}</p>
      <p>{blackCard}</p>
      {whiteCard.map((e) => (
        <p onClick={(e) => updateScore(e)} data-id={e.user} >{e.answer}</p>
      ))}
      <p></p>
    </div>
  )
}

export default VoteCard;