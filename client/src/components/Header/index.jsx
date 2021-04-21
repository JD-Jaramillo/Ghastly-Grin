import React from "react";
import Nav from "../Nav";
import "./style.css"
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="banner .container-fluid">
      <Link to="/">
        <h1 className="row">Ghastly Grin</h1>
      </Link>
      <nav className="nav-group">
        <Link to="/">
          <span><a className="nav-links">Home</a></span>
        </Link>
        <Link to="/Lobby">
          <span><a className="nav-links">Lobby</a></span>
        </Link >
        <Link to="/Lobby">
          <span><a className="nav-links">Exit Game</a></span>
        </Link >
      </nav>
      <Nav />
    </div>

  )
}

export default Header;

