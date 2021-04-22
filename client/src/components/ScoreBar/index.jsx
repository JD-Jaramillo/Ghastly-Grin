import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";

function ScoreBar() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get('/api/player', { withCredentials: true })
    .then(async res => {
      const playerData = res.data.data;
      console.log(playerData)
      for (let element of playerData) {
        const { data } = await axios.get(`/api/user/${element.user_id}`, { withCredentials: true });
        setPlayers(players => [...players, {name: data.username, score: element.score}])
    }
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <>
    {players.map(e => (
      <div key={e.name}>{e.name}: {e.score}</div>
    ))}
    </>
  )
}

export default ScoreBar;