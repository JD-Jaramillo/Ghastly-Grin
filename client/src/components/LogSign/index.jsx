import React, { useRef } from "react";
// import userContext from "../../utils/userContext";
import "./style.css";

function LogSign() {
  // const { id, name } = userContext(userContext);
  const loginEmail = useRef();
  const loginUsername = useRef();
  const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = loginEmail.current.value;
    const password = loginUsername.current.value;

    if (email && password) {
      const response = await fetch('http://localhost:3001/api/user/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        console.log("testpass")
        document.location.replace('/CreateGame');
      } else {
        alert('Failed to log in.');
      }
    }
  };
  const signupEmail = useRef();
  const signupUsername = useRef();
  const signupPassword = useRef();

  const signupFormHandler = async (event) => {
    event.preventDefault();
    const email = signupEmail.current.value;
    const username = signupUsername.current.value;
    const password = signupPassword.current.value;

    if (email && username && password) {
      const response = await fetch('http://localhost:3001/api/user', {
        method: 'POST',
        body: JSON.stringify({ email, username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/CreateGame');
      } else {
        alert('Your password must be atleast 8 characters long and use a valid email');
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <form className="col-4 offset-1">
          <h3>Sign Up</h3>
          <div className="form-group">
            <label htmlFor="signupUsername">Username</label>
            <input ref={signupUsername} type="text" className="form-control" id="signupUsername" aria-describedby="userHelp" />
          </div>
          <div className="form-group">
            <label htmlFor="signupEmail">Email address</label>
            <input ref={signupEmail} type="email" className="form-control" id="signupEmail" aria-describedby="emailHelp" />
          </div>
          <div className="form-group">
            <label htmlFor="signupPassword">Password</label>
            <input ref={signupPassword} type="password" className="form-control" id="signupPassword" />
          </div>
          <button onClick={signupFormHandler} type="submit" className="btn">Sign Up</button>
        </form>
        <form className="col-4 offset-1">
          <h3>Log In</h3>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input ref={loginEmail} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input ref={loginUsername} type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <button onClick={loginFormHandler} type="submit" className="btn">Log In</button>
        </form>
      </div>
    </div>
  )
}

export default LogSign;