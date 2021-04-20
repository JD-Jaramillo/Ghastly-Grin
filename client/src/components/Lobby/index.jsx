import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";


function Lobby() {
    const [players, setPlayers] = useState([])
    const getPlayers = () => {
        axios.get('/api/player', { withCredentials: true })
            .then(async res => {
                
                const playerData = res.data.data;
                for (let element of playerData) {
                    console.log(element);
                    const {data} = await axios.get(`/api/user/${element.user_id}`, { withCredentials: true });
                    console.log(data);
                    setPlayers(players => [...players, data.username])
                }
            })
            .catch(err => console.log(err))
    }

    const getUsernames = async (newID) => {
        console.log(newID);
        try {
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getPlayers()
    }, [])

    return (
        <>
            <div className="lobby-page">
                <div className="lobby-start">
                    <h4 className="lob-h">Lobby</h4>
                    <button onClick={getPlayers} type="submit" className="btn startBtn btn-primary">Start Game</button>
                    {/* Each player that joins the lobby array will need to be mapped through here to be rendered on the page */}
                    <ol className="players">
                        {players.map(player => {
                            return (<li>{player}</li>)
                        })}
                        <li>Player 1</li>
                        <li>Player 2</li>
                        <li>Player 3</li>
                        <li>Player 4</li>
                        <li>Player 5</li>
                    </ol>
                </div>
                <div className="chat">
                    <h3 className="chat-h">Chat</h3>
                    {/* The chat will need to mapped through to dynamically render each comment by user_id */}
                    <ul className="chat-cont">
                        <li>Text 1</li>
                        <li>Text 1</li>
                        <li>Text 1</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Lobby;