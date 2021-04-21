import React, { useContext } from "react";
import { Link } from "react-router-dom";
import userContext from "../../utils/userContext"
import "./style.css";

function Nav() {
  const { id } = useContext(userContext);
  return (
    <ul className="nav justify-content-end">
      {id === "" ? 
        <li className="nav-item">
          <Link className="nav-link" to="/LogSign">Log-In/Sign-Up</Link>
        </li>
       : 
       <>
        <li className="nav-item">
          <Link className="nav-link" to="/CreateGame">Create/Join Game</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">Logout</Link>
        </li>
        </>
       }
    </ul>
  )
}

export default Nav;