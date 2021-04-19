import React from "react";
import "./style.css";

function Lobby() {
    return (
        <>
            <form>
                <div className="lobby-group">
                    <h4>Lobby</h4>
                </div>
                <button type="submit" className="btn startBtn btn-primary">Start Game</button>
                {/* Each player that joins the lobby array will need to be mapped through here to be rendered on the page */}
                <ol>
                    <li>Player 1</li>
                    <li>Player 2</li>
                    <li>Player 3</li>
                    <li>Player 4</li>
                    <li>Player 5</li>
                </ol>
            </form>
            <div className="form-group">
                <h3>Chat</h3>
                {/* The chat will need to mapped through to dynamically render each comment by user_id */}
                <ul>
                    <li>Text 1</li>
                    <li>Text 1</li>
                    <li>Text 1</li>
                </ul>
            </div>
        </>
    )
}

export default Lobby;