import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    <ul className="nav nav-login">
      {loggedIn ?
        <>
          <li className="nav-item">
            <Link to="/CreateGame">
              <div className="nav-link">Create/Join Game</div>
            </Link>
          </li>
          <li className="nav-item">
            <div onClick={logOut} className="nav-link">Log Out</div>
          </li>
        </>
        :
        <li className="nav-item">
          <Link to="/LogSign">
            <div className="nav-link">Log In</div>
          </Link>
        </li>
      }
    </ul>
  )
}

export default Nav;