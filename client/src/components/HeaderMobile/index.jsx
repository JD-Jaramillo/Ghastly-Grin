import React, { useState } from "react";
import Nav from "../Nav";
import "./style.css";
import { Link } from 'react-router-dom';

function HeaderMobile() {
  const [hamburgerState, setHamburgerState] = useState(true);

  return (
    <nav className="mobile-navigation .container-fluid">
      <div className="mobile-menu-base">
        <img className="headLogo" src="/GhastlyGrinLogoTrans_green.png" alt="logo" />
        <Link to="/">
          <h1 id="title" className="row">Ghastly<span className="wrap">Grin</span></h1>
        </Link>
        <div onClick={() => setHamburgerState(!hamburgerState)} className={hamburgerState ? null : 'open'} id="nav-icon2">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div onClick={() => setHamburgerState(!hamburgerState)} className={hamburgerState ? 'mobile-dropdown' : 'mobile-dropdown open'} >
        <div className="nav-group">
          <Link className="nav-link-wrap" to="/">
            <span className="nav-links">Home</span>
          </Link>
          <Link className="nav-link-wrap" to="/Lobby">
            <span className="nav-links">Lobby</span>
          </Link >
          <Link className="nav-link-wrap" to="/Lobby">
            <span className="nav-links">Exit Game</span>
          </Link >
        </div>
        <Nav />
      </div>
    </nav>
  )
}

export default HeaderMobile;
