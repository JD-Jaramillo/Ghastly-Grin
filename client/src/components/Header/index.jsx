import React from "react";
import Nav from "../Nav";
import "./style.css"

function Header() {
  return (
    <div className="banner .container-fluid">
      <h1 className="row">Ghastly Grin</h1>
      <Nav />
    </div>

  )
}

export default Header;