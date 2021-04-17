import React from "react";
import "./style.css";

function LogSign() {
  return (
    <div className="container">
      <div className="row">
      <form className="col-4 offset-1">
        <div className="form-group">
          <h3>Log-In</h3>
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"/>
        </div>
          <button type="submit" className="btn">Log-In</button>
      </form>
      <form className="col-4 offset-1">
        <div className="form-group">
          <h3>Sign-Up</h3>
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"/>
        </div>
          <button type="submit" className="btn">Sign-Up</button>
      </form>
      </div>
    </div>
  )
}

export default LogSign;