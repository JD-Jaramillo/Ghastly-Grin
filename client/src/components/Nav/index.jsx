import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userContext from "../../utils/userContext"
import "./style.css";

function Nav() {
  const [loggedIn, setLoggedIn] = useState();

  const logOut = () => {
    axios.post('/api/user/logout', { withCredentials: true })
    .then(() => {
      console.log("Logged Out")
      document.location.replace('/')
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    axios.get('/api/user')
      .then(res => {
        setLoggedIn(res.data.loggedIn)
      })
  }, [])
  return (
    <ul className="nav justify-content-end">
      {loggedIn ?
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/CreateGame">Create/Join Game</Link>
          </li>
          <li className="nav-item">
          <div onClick={logOut} className="nav-link">Log-Out</div>
          </li>
        </>
        :
        <li className="nav-item">
          <Link className="nav-link" to="/LogSign">Log-In/Sign-Up</Link>
        </li>
      }
    </ul>
  )
}

export default Nav;