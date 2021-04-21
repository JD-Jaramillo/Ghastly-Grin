import React from "react";
import "./style.css";

function Lobby() {
    return (
        <>
            <div className="lobby-page">
                <div className="lobby-start">
                    <h4 className="lob-h">Lobby</h4>
                    <button type="submit" className="btn startBtn btn-primary">Start Game</button>
                    {/* Each player that joins the lobby array will need to be mapped through here to be rendered on the page */}
                    <ol className="players">
                        <li>Player 1</li>
                        <li>Player 2</li>
                        <li>Player 3</li>
                        <li>Player 4</li>
                        <li>Player 5</li>
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