import React, { useRef, useState } from "react";
import Nav from "../Nav";
import "./style.css"
import { Link } from 'react-router-dom';

function Header() {
  

  return (
    <nav className="desktop-navigation .container-fluid">
      <img className="headLogo" src="/GhastlyGrinLogoTrans_green.png" alt="logo" />
      <Link to="/">
        <h1 id="title" className="row">Ghastly Grin</h1>
      </Link>
      <div className="nav-group">
        <Link to="/">
          <span><a className="nav-links">Home</a></span>
        </Link>
        <Link to="/Lobby">
          <span><a className="nav-links">Lobby</a></span>
        </Link >
        <Link to="/Lobby">
          <span><a className="nav-links">Exit Game</a></span>
        </Link >
      </div>
      <Nav />
    </nav>
  )
}

export default Header;
