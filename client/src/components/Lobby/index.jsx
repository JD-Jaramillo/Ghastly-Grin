import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import axios from "axios";
import { useHistory } from "react-router";


function Lobby() {
    const history = useHistory();
    const [players, setPlayers] = useState([]);
    var [user, setUser] = useState();
    const [game, setGame] = useState();
    var [owner, setOwner] = useState();
    const [whiteCards, setWhiteCards] = useState([]);
    const [rounds, setRounds] = useState();
    const [timer, setTimer] = useState();
    // let ownerID;
    // let userID;
    const numRounds = useRef();
    const timerCount = useRef();
    const cohortPack = useRef();
    const cahPack = useRef();

    const getPlayers = async () => {
        await axios.get('/api/player', { withCredentials: true })
            .then(async res => {
                console.log(res.data.data)
                const playerData = res.data.data;
                await setGame(playerData[0].game_id)
                await setUser(res.data.session.user_id)
                // userID = res.data.session.user_id
                for (let element of playerData) {
                    const { data } = await axios.get(`/api/user/${element.user_id}`, { withCredentials: true });
                    await setPlayers(players => [...players, data.username])
                }
            })
            .catch(err => console.log(err));
        await axios.get('/api/game', { withCredentials: true })
            .then(async res => {
                setOwner(res.data.game_owner)
                setRounds(res.data.maxrounds)
                setTimer(res.data.timer)
                // ownerID = res.data.game_owner
            })
            .catch(err => console.log(err));

        function stopTimer() {
            clearInterval(timerInterval)
        }
        const timerInterval = setInterval(checkPlayers, 1000);
        async function checkPlayers() {
            await axios.get('/api/game', { withCredentials: true })
                .then(res => {
                    if (res.data.round > 0) {
                        stopTimer();
                        // if (userID !== ownerID) {
                        axios.put('/api/player/hand', { withCredentials: true })
                        .then(res => {
                            history.push('/GamePlay')
                        })
                        // }
                    }
                })
                .catch(err => console.log(err));
            await axios.get('/api/player', { withCredentials: true })
                .then(async res => {
                    const playerData = res.data.data;
                    console.log(playerData.length, players.length)
                    if (playerData.length > players.length) {
                        for (let element of playerData) {
                            const { data } = await axios.get(`/api/user/${element.user_id}`, { withCredentials: true });
                            if (players.includes(data.username)) {
                                await setPlayers(players => [...players, data.username])
                            }
                        }
                    }
                })
                .catch(err => console.log(err))
        }
    }
    const updateGame = async (e) => {
        e.preventDefault();
        await axios.put('/api/game/update', { rounds: numRounds.current.value, timer: timerCount.current.value, cp: cohortPack.current.checked, cah: cahPack.current.checked }, { withCredentials: true })
            .then(res => {
                setWhiteCards(res.data.answers)
            })
            .catch(err => console.log(err))
    }

    const removeCard = async (e) => {
        console.log(e.target.innerHTML);
        await axios.put('/api/deck/del', { card: e.target.innerHTML }, { withCredentials: true })
            .then(res => {
                console.log("set new whitecards")
                setWhiteCards(res.data)
            })
            .catch(err => console.log(err))
    }

    const newCard = useRef()
    const addCard = async () => {
        await axios.put('/api/deck', { card: newCard.current.value }, { withCredentials: true })
            .then(res => {
                newCard.current.value = ""
            })
            .catch(err => console.log(err));
    }

    const startGame = async () => {
        await axios.put('/api/game/', { withCredentials: true })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        await axios.post('/api/round', { users: players }, { withCredentials: true })
            .then(res => {
                console.log(res)
                // history.push('/GamePlay')
            })
            .catch(err => console.log("round: " + err))
    }

    useEffect(() => {
        const getCards = async () => {
            console.log(whiteCards)
            await axios.get('/api/deck', { withCredentials: true })
                .then(res => {
                    console.log("getWhite")
                    setWhiteCards(res.data.answers)
                })
                .catch(err => console.log(err));
        }
        getPlayers();
        getCards();
    }, [])

    return (
        <>
            <div className="lobby-page">
                <div className="lobby-start">
                    <h4 className="lob-h">Lobby</h4>
                    <h4 className="lob-h">Lobby ID: {game}</h4>
                    {user === owner ?
                        <form>
                            <div className="form-group">
                                <label htmlFor="numRounds">Number of Rounds</label>
                                <input ref={numRounds} type="number" className="form-control" id="numRounds" aria-describedby="numRounds" defaultValue={rounds} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="timerCount">Timer Per Round</label>
                                <input ref={timerCount} type="number" className="form-control" id="timerCount" aria-describedby="timerCount" defaultValue={timer} />
                            </div>
                            <div className="form-group">
                                <input
                                    ref={cohortPack}
                                    type="checkbox"
                                    id="GCP"
                                    aria-describedby="GCP"
                                    value="cohort" />
                                <label htmlFor="GCP">Greatest Cohort Pack</label>
                            </div>
                            <div className="form-group">
                                <input
                                    ref={cahPack}
                                    type="checkbox"
                                    id="cah"
                                    aria-describedby="cah"
                                    value="cah" />
                                <label htmlFor="GCP">CardsAgainstHumanity Pack</label>
                            </div>
                            <div className="btn-parent">
                                <button onClick={(e) => updateGame(e)} type="click" className="btn">Update Game</button>
                            </div>
                        </form>
                        : null}
                    <button onClick={owner === user ? startGame : null} type="submit" className="btn startBtn">{owner === user ? 'Start Game' : 'Waiting'}</button>
                    <input
                        ref={newCard}
                        type="text"
                        aria-describedby="addCard" />
                    <button onClick={addCard} type="button" className="btn startBtn">Create Answer Card</button>
                    <ul className="players">
                        {players.map(player => {
                            return (<li key={player}>{player}</li>)
                        })}
                    </ul>
                </div>
                <div className="chat">
                    <h4 className="chat-h">Answer Cards</h4>
                    <ul className="chat-cont">
                        {user === owner ? whiteCards.map(whitecard => {
                            return (<div key={whitecard} onMouseOut={(e) => e.target.style.backgroundColor = "#d8d8d8"} onMouseOver={(e) => { e.target.style.cursor = "pointer"; e.target.style.backgroundColor = "red" }} onClick={(e) => removeCard(e)}>{whitecard}</div>)
                        }) : <div>Only the owner can view cards</div>}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Lobby;