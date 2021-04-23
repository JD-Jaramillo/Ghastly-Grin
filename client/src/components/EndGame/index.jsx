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
     {players.map(e => (
            <div key={e.name} className="">{e.name}: {e.score}</div>
          ))}
    </>
  )
}

export default EndGame;