import React from "react";
import Nav from "../Nav";
import "./style.css"
import { Link } from 'react-router-dom';

function Header(props) {


  return (
    <nav className="desktop-navigation .container-fluid">
      <img className="headLogo" src="/ghastlyGrinLogoTrans_green.png" alt="logo" />
      <Link to="/">
        <h1 id="title" className="row">Ghastly Grin</h1>
      </Link>
      <div className="nav-group">
        <Link to="/">
          <span><div className="nav-links">Home</div></span>
        </Link>
        {props.gameID ?
          <>
            <Link to="/Lobby">
              <span><div className="nav-links">Lobby</div></span>
            </Link >
            <Link to="/">
              <div className="nav-links">Exit Game</div>
            </Link >
          </>
          : null
        }
      </div>
      <Nav loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} />
    </nav>
  )
}

export default Header;
