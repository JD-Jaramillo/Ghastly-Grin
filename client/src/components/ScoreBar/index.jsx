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
          setPlayers(players => [...players, { name: data.username, score: element.score }])
        }
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <div className="tcontainer">
        <div className="ticker-wrap">
          <div className="ticker-move">
          <h5 className="ticker-item">Scoreboard: </h5>
          {players.map(e => (
            <div className="ticker-item">{e.name}: {e.score}</div>
          ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ScoreBar;