import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";


function EndGame() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get('/api/player', { withCredentials: true })
      .then(async res => {
        const playerData = res.data.data;
        console.log(playerData)
        for (let element of playerData) {
          const { data } = await axios.get(`/api/user/${element.user_id}`, { withCredentials: true });
          setPlayers(players => [...players, { name: data.username, score: element.score }])
        }
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <div className="endContainer">
        <ul className="list-group">
        <h5 className="scoreHeader">Scoreboard</h5>
        {players.map(e => (
          <li className="list-group-item" key={e.name}>{e.name}: {e.score}</li>
        ))}
        </ul>
      </div>
    </>
  )
}

export default EndGame;