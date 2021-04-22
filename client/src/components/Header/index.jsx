import React, { useRef, useState } from "react";
import Nav from "../Nav";
import "./style.css"
import { Link } from 'react-router-dom';

function Header() {
  const [hamburgerState, setHamburgerState] = useState(true);

  return (
    <div className="banner .container-fluid">
      <img className="headLogo" src="/GhastlyGrinLogoTrans_green.png" alt="logo" />
      <Link to="/">
        <h1 id="title" className="row">Ghastly Grin</h1>
      </Link>
      <nav className="nav-group">
        <div onClick={() => setHamburgerState(!hamburgerState)} className={hamburgerState ? null : 'open'} id="nav-icon2">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {hamburgerState ? null : <div>New-Home</div>}
        {hamburgerState ? null : <div>New-Lobby</div>}
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
