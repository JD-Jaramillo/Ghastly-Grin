import React from "react";
import "./style.css";

function Nav() {
  return (
    <ul className="nav justify-content-end">
      <li className="nav-item">
        <a className="nav-link" href="/">Log-In</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/">Sign-Up</a>
      </li>
    </ul>
  )
}

export default Nav;