import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import io from "socket.io-client"
const socket = io.connect("127.0.0.1:3001/");

function App() {
  const [apiFetch, setApiFetch] = useState();

  const callAPI = () => {
    fetch("http://localhost:3001/testAPI")
      .then(res => res.text())
      .then(res => setApiFetch(res))
  }

  
  callAPI();
  
  socket.emit("welcome", "connected");
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {apiFetch}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
