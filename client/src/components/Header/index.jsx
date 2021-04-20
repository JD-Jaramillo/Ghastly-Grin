import React from "react";
import Nav from "../Nav";
import "./style.css"
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="banner .container-fluid">
      <Link to="/">
        <h1 className="row">Ghastly Grin</h1>
      </Link>
      <Nav />
    </div>

  )
}

export default Header;

