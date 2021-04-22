import React from "react";
import Nav from "../Nav";
import "./style.css"
import { Link } from 'react-router-dom';

function Header() {

  // document.onreadystatechange = () => {
  //   if (document.readyState == "interactive") {
  //     ('#nav-icon2').click(function () {
  //       this.toggleClass('open');
  //     });
  //   }

  return (
    <div className="banner .container-fluid">
      <img className="headLogo" src="/GhastlyGrinLogoTrans_green.png" alt="logo"/>
      <Link to="/">
        <h1 className="row bighead">Ghastly Grin</h1>
      </Link>
      <nav className="nav-group">
        <div id="nav-icon2">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
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
