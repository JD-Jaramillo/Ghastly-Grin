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
            <Link to="/CreateGame">
              <span><a className="nav-links">Create/Join Game</a></span>
            </Link>
          </li>
          <li className="nav-item">
            <span><a onClick={logOut} className="nav-links">Log Out</a></span>
          </li>
        </>
        :
        <li className="nav-item">
          <Link to="/LogSign">
            <span><a className="nav-links">Log In</a></span>
          </Link>
        </li>
      }
    </ul>
  )
}

export default Nav;