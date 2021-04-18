import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Nav() {
  return (
    <ul className="nav justify-content-end">
      <li className="nav-item">
        <Link className="nav-link" to="/LogSign">Log-In/Sign-Up</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/CreateGame">Create Game</Link>
      </li>
    </ul>
  )
}

export default Nav;