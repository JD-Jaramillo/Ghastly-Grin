import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import questions from "../../utils/questions";


function Lobby() {
    const [players, setPlayers] = useState([]);
    // const [user, setUser] = useState();
    const [game, setGame] = useState();
    const getPlayers = () => {
        axios.get('/api/player', { withCredentials: true })
            .then(async res => {
                const playerData = res.data.data;
                setGame(playerData[0].game_id)
                // setUser(res.data.session.user_id)
                for (let element of playerData) {
                    const { data } = await axios.get(`/api/user/${element.user_id}`, { withCredentials: true });
                    setPlayers(players => [...players, data.username])
                }
            })
            .catch(err => console.log(err))
        setInterval(() => {
            setPlayers([]);
            axios.get('/api/player', { withCredentials: true })
                .then(async res => {

                    const playerData = res.data.data;
                    for (let element of playerData) {
                        const { data } = await axios.get(`/api/user/${element.user_id}`, { withCredentials: true });
                        setPlayers(players => [...players, data.username])
                    }
                })
                .catch(err => console.log(err))

        }, 15000);
    }

    const startGame = async () => {
        const rng = Math.floor(Math.random() * questions.length)
        const prompt = questions[rng];
        await axios.post('/api/round', { prompt: prompt, game_id: game, users: players }, { withCredentials: true })
            .then(res => {
                document.location.replace('/GamePlay')
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getPlayers()
    }, [])

    return (
        <>
            <div className="lobby-page">
                <div className="lobby-start">
                    <h4 className="lob-h">Lobby</h4>
                    <button onClick={startGame} type="submit" className="btn startBtn">Start Game</button>
                    {/* Each player that joins the lobby array will need to be mapped through here to be rendered on the page */}
                    <ol className="players">
                        {players.map(player => {
                            return (<li key={player}>{player}</li>)
                        })}

                    </ol>
                </div>
                <div className="chat">
                    <h4 className="chat-h">Chat</h4>
                    {/* The chat will need to mapped through to dynamically render each comment by user_id */}
                    <ul className="chat-cont">
                        <li className="ch-ct"><span>user_id </span><span className="text">Chat content</span></li>
                        <li className="ch-ct"><span>user_id </span><span className="text">Chat content</span></li>
                        <li className="ch-ct"><span>user_id </span><span className="text">Chat content</span></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Lobby;